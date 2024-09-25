const express = require('express');
const router = express.Router();
const Admin = require('../models/admin'); 
const middle =require('../middleware/auth')
router.post('/login', async (req, res) => {
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

