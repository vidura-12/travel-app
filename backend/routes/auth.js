const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Admin = require('../models/admin'); 
const jwt = require('jsonwebtoken');
require('dotenv').config();
const middle = require('../middleware/auth.js');

<<<<<<< HEAD
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
=======
router.post('/loginn', async (req, res) => {
  const password = req.body.password;
  const username = req.body.username;
>>>>>>> main
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

<<<<<<< HEAD
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
=======
const User = require('../models/User');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, dob, age, gender, contact, NIC, email, password } = req.body;
  
  try {
    
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    
    user = new User({
      name,
      dob,
      age,
      gender,
      contact,
      NIC,
      email,
      password: hashedPassword,
    });
    
    await user.save();
    
    // Generate JWT
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ token });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      const payload = { userId: user.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ token });
    } catch (err) {
      res.status(500).send('Server error');
    }
  });

  const authMiddleware = require('../middleware/authMiddleware');


router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');  // Exclude password
    res.json(user);  
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// PUT /api/auth/profile (Protected Route)
router.put('/profile', authMiddleware, async (req, res) => {
  const { name, dob, age, gender, contact, NIC } = req.body;

  try {
    // Find user by ID from the auth middleware
    let user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update the user's fields
    user.name = name || user.name;
    user.dob = dob || user.dob;
    user.age = age || user.age;
    user.gender = gender || user.gender;
    user.contact = contact || user.contact;
    user.NIC = NIC || user.NIC;

    // Save the updated user profile
    await user.save();

    res.json(user);  // Return the updated user profile (excluding password)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
>>>>>>> main
  }
});


module.exports = router;

