const express = require('express');
const Seller = require('../models/Seller');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Register seller
router.post('/add', async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  
  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newSeller = new Seller({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    await newSeller.save();
    res.status(201).json({ message: 'Seller registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering seller' });
  }
});

module.exports = router;
