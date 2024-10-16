const VehicleOwner = require('../models/VehicleOwner');
const Vehicle = require('../models/Vehicle');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'your_jwt_secret'; // Use environment variable for security

// Register vehicle owner
exports.register = async (req, res) => {
  try {
    const { fullName, phoneno, username, email, password } = req.body;

    // Check if vehicle owner already exists
    let vehicleOwner = await VehicleOwner.findOne({ email });
    if (vehicleOwner) {
      return res.status(400).json({ msg: 'Vehicle owner already exists' });
    }

    // Create a new vehicle owner
    vehicleOwner = new VehicleOwner({
      fullName,
      phoneno,
      username,
      email,
      password,
      });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    vehicleOwner.password = await bcrypt.hash(password, salt);

    await vehicleOwner.save();

    // Create a JWT token
    const token = jwt.sign({ id: vehicleOwner._id, role: vehicleOwner.role }, secret, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ msg: 'Server error..! Please try again' });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if username and password are provided
    if (!email || !password) {
      return res.status(400).json({ msg: 'Username and password are required' });
    }

    // Find the user by username
    const vehicleOwner = await VehicleOwner.findOne({ email });
    if (!vehicleOwner) {
      return res.status(400).json({ msg: 'Invalid username or password' });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, vehicleOwner.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        userId: vehicleOwner._id,
        email: vehicleOwner.email,
        role: vehicleOwner.role
      },
      secret,
      { expiresIn: '1h' }
    );

    // Send back the token
    res.status(200).json({ token, msg: 'Login successful' });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error, please try again later' });
  }
};

exports.getAllVehicleOwners = async (req, res) => {
  try {
    const vehicleOwners = await VehicleOwner.find();
    res.json(vehicleOwners);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getVehicleOwnerProfile = async (req, res) => {
  try {
    const vehicleOwner = await VehicleOwner.findById(req.params.userId);
    if (!vehicleOwner) {
      return res.status(404).json({ msg: 'Owner not found' });
    }
    res.json(vehicleOwner);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getVehicleOwnerById = async (req, res) => {
  try {
    const vehicleOwner = await VehicleOwner.findById(req.params.id);
    if (!vehicleOwner) {
      return res.status(404).json({ msg: 'Owner not found' });
    }
    res.json(vehicleOwner);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateVehicleOwner = async (req, res) => {
  try {
    const updatedOwner = await VehicleOwner.findByIdAndUpdate
    (req.params.id, req.body, { new: true });
    if (!updatedOwner) {
      return res.status(404).json({ msg: 'Owner not found' });
    }
    res.status(200).json(updatedOwner);
  }
  catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteVehicleOwner = async (req, res) => {
  try {
    const vehicleOwner = await VehicleOwner.findByIdAndDelete(req.params.id);
    if (!vehicleOwner) {
      return res.status(404).json({ msg: 'Owner not found' });
    }
    res.status(200).json({ msg: 'Owner deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};


exports.profile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, secret);
    const vehicleOwner = await VehicleOwner.findById(decoded.id);

    if (!vehicleOwner) {
      return res.status(404).json({ msg: 'Owner not found' });
    }

    const totalVehicles = await Vehicle.countDocuments({ owner: decoded.id });
    const pendingVehicles = await Vehicle.countDocuments({ owner: decoded.id, status: 'pending' });

    res.json({ 
      owner: vehicleOwner, 
      vehicleCounts: { total: totalVehicles, pending: pendingVehicles } 
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getVehicleOwnerProfile = async (req, res) => {
  console.log('Fetching profile for user:', req.user);
  try {
    const vehicleOwner = await VehicleOwner.findById(req.user.userId);
    if (!vehicleOwner) {
      console.log('Vehicle owner not found for userId:', req.user.userId);
      return res.status(404).json({ message: 'Vehicle owner not found' });
    }
    const { password, ...ownerDetails } = vehicleOwner.toObject(); // Exclude password from the response
    console.log('Owner Details:', ownerDetails); // Log the details
    res.status(200).json(ownerDetails); // Return the vehicle owner details
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};


// Helper function to get user ID from token
const getUserIdFromToken = (token) => {
  const decodedToken = jwt.verify(token, 'your_secret_key'); 
  return decodedToken.id; 
};

