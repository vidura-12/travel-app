// backend/routes/hotelRoutes.js

const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const  authenticateToken  = require('../middleware/auth');

// Route to add a new hotel
router.post('/add', authenticateToken, hotelController.addHotel);

// Route to get all approved hotels
router.get('/approved', hotelController.getHotels);

// Export the router
module.exports = router;
