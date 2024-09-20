const express = require('express');
<<<<<<< HEAD
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin'); // Ensure this is the correct path to the Admin model
const User = require('../models/user');
const router = express.Router();
=======
const router = express.Router();
const Admin = require('../models/admin'); 
>>>>>>> main

// Login Route
router.post('/login', async (req, res) => {
<<<<<<< HEAD
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  
  try {
    // Find the admin by email
    const admin = await User.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email.' });
    }
    
    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log(admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid  password.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful.',
      token,
      role: admin.role
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
=======
  const password = req.body.password;
  const username = req.body.username;
  try {
    const admin = await Admin.findOne({ username, password });

    if (admin) {
      res.json({ message: 'Login complete', role: admin.role });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
>>>>>>> main
  }
});

module.exports = router;
