const express = require('express');
const User = require('../models/selleracc');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
      console.log(req.body);
      const { name, email, password, phone, address, role } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists.' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create new user
      const newUser = new User({ name, email, password: hashedPassword, phone, address, role });
      await newUser.save();
  
      // Create and assign a token
      const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.TOKEN, { expiresIn: '1h' });
      res.status(201).json({ token, role: newUser.role });
    } catch (error) {
      console.error('Signup error:', error); // Log error details for debugging
      res.status(500).json({ message: 'Error creating user', error });
    }
  });
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password.' });
      }
  
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password.' });
      }
  
      // Create and assign a token
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.TOKEN, { expiresIn: '1h' });
  
      // Respond with token and user role
      res.status(200).json({ token, role: user.role }); // Ensure the role is included in the response
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  });

  
  
  
  
  module.exports = router;