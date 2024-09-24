const VehicleOwner = require('../models/VehicleOwner');
const Vehicle = require('../models/Vehicle');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'your_jwt_secret'; // Use environment variable for security

// Register vehicle owner
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if vehicle owner already exists
    let vehicleOwner = await VehicleOwner.findOne({ email });
    if (vehicleOwner) {
      return res.status(400).json({ msg: 'Vehicle owner already exists' });
    }

    // Create a new vehicle owner
    vehicleOwner = new VehicleOwner({
      firstName,
      lastName,
      username,
      email,
      password,
      age,
      location,
      phone,
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    vehicleOwner.password = await bcrypt.hash(password, salt);

    await vehicleOwner.save();

    // Create a JWT token
    const token = jwt.sign({ id: vehicleOwner._id, role: vehicleOwner.role }, secret, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};


exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const vehicleOwner = await VehicleOwner.findOne({ username });
    if (!vehicleOwner) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, vehicleOwner.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }


    const token = jwt.sign(
      {
        id: vehicleOwner._id,
        username: vehicleOwner.username,  
        role: vehicleOwner.role
      },
      secret,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
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

