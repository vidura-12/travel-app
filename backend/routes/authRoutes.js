// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Ensure this is the correct path to the User model
const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Validate input
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    // Hash the password before saving
    // const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);
    
    // Create and save the user
    const newUser = new User({ name, email, password: password });
    await newUser.save();

    // Return the user details
    res.status(201).json({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password, // Note: Returning the hashed password is not recommended for security reasons
      _id: newUser._id,
      createdAt: newUser.createdAt,
      __v: newUser.__v,
    });
  } catch (error) {
    console.error('Error during signup:', error.message); // Log actual error for debugging
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
