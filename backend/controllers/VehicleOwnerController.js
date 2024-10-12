const VehicleOwner = require('../models/VehicleOwner');
const Vehicle = require('../models/Vehicle');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'your_jwt_secret'; // Use environment variable for security

// Register vehicle owner
exports.register = async (req, res) => {
  try {
    const { firstname, phoneno, username, email, password } = req.body;

    // Check if vehicle owner already exists
    let vehicleOwner = await VehicleOwner.findOne({ email });
    if (vehicleOwner) {
      return res.status(400).json({ msg: 'Vehicle owner already exists' });
    }

    // Create a new vehicle owner
    vehicleOwner = new VehicleOwner({
      firstname,
      // secondname,
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
        id: vehicleOwner._id,
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


// Fetch vehicle owner profile and their vehicles
// exports.profile = async (req, res) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const decoded = jwt.verify(token, secret);
//     const vehicleOwner = await VehicleOwner.findById(decoded.id);
//     const vehicles = await Vehicle.find({ owner: decoded.id });

//     if (!vehicleOwner) {
//       return res.status(404).json({ msg: 'Owner not found' });
//     }

//     res.json({ owner: vehicleOwner, vehicles });
//   } catch (err) {
//     res.status(500).json({ msg: 'Server error' });
//   }
// };

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

// Helper function to get user ID from token
const getUserIdFromToken = (token) => {
  const decodedToken = jwt.verify(token, 'your_secret_key'); 
  return decodedToken.id; 
};

