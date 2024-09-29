const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Get Profile
exports.getProfile = async (req, res) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user.id;

    const user = await User.findById(userId).select('-password'); // Exclude password field
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user);  // Send the user profile as response
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update Profile
exports.updateProfile = async (req, res) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user.id;

    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const { name, dob, age, gender, contact, NIC, password } = req.body;

    // Update user fields
    if (name) user.name = name;
    if (dob) user.dob = dob;
    if (age) user.age = age;
    if (gender) user.gender = gender;
    if (contact) user.contact = contact;
    if (NIC) user.NIC = NIC;

    // If password is provided, hash and update it
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json(user);  // Return the updated user profile
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
