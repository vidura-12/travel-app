const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Validate user input
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error during signup:', error.message); // Log the actual error
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

  

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate user input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Generate a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful.', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
