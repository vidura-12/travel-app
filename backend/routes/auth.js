const express = require('express');
const router = express.Router();
const Admin = require('../models/admin'); 

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

module.exports = router;
