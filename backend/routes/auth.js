const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Admin = require('../models/admin'); 

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (isMatch) {
      res.json({ message: 'Login complete', role: admin.role });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
