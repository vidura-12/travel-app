const express = require('express');
const router = express.Router();

// Import the controller functions
const {
    createHotel,
    getHotels,
    approveHotel,
} = require('../controllers/hotelController');

// Define routes

// POST route to create a new hotel
router.post('/', createHotel);

// GET route to fetch all approved hotels
router.get('/', getHotels);

// PUT route to approve a hotel by ID
router.put('/:id/approve', approveHotel);

// Export the router
module.exports = router;
