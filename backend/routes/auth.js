const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Admin = require('../models/admin'); 
const jwt = require('jsonwebtoken');
require('dotenv').config();
const middle = require('../middleware/auth.js');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid username' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a token after successful password match
    const token = jwt.sign(
      { id: admin._id, role: admin.role }, 
      process.env.TOKEN, // Ensure this is the correct environment variable
      { expiresIn: '1h' } // Optionally set an expiration
    );

    console.log(admin.role);
    res.json({ token, role: admin.role , username: admin.username });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/profile/:username', middle, async (req, res) => {
  try {
    const { username } = req.params; // Extract username from request parameters

    // Use findOne to search by username instead of findById
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json(admin);
  } catch (err) {
    console.error('Error fetching admin:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;