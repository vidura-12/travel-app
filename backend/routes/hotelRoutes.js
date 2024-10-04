// backend/routes/hotelRoutes.js

const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const hotelOwnerController = require('../controllers/hotelOwnerController');
const  authenticateToken  = require('../middleware/auth');

// Route to add a new hotel
router.post('/add', authenticateToken, hotelController.addHotel);

// Route to get all approved hotels
router.get('/approved', hotelController.getHotels);

// New route to get hotels of the authenticated owner
router.get('/owner', authenticateToken, hotelController.getMyHotels);

// Export the router
module.exports = router;
