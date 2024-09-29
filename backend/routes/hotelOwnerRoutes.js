const express = require('express');
const router = express.Router();
const { registerHotelOwner, loginHotelOwner } = require('../controllers/hotelOwnerController');

// Register Route
router.post('/register', registerHotelOwner);

// Login Route
router.post('/login', loginHotelOwner);

module.exports = router;
