const express = require('express');
const router = express.Router();

// Import the controller functions
const {
    createHotel,
    getHotels,
    approveHotel,
} = require('../controllers/hotelController');

// Import the authentication middleware
const verifyToken = require('../middleware/auth'); // Ensure the path is correct

// Define routes

// POST route to create a new hotel (Protected Route)
router.post('/', verifyToken, createHotel);

// GET route to fetch all approved hotels (Public Route)
// Apply `verifyToken` if this route should also be protected
router.get('/', getHotels);

// PUT route to approve a hotel by ID (Protected Route)
router.put('/:id/approve', verifyToken, approveHotel);

// Export the router
module.exports = router;
