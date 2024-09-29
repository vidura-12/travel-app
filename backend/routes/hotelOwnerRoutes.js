// routes/hotelOwnerRoutes.js

const express = require('express');
const router = express.Router();
const hotelOwnerController = require('../controllers/hotelOwnerController');
const  authenticateToken  = require('../middleware/auth'); // Destructure if exported as an object

// Specific routes first
router.post('/', hotelOwnerController.createHotelOwner); // Create a new hotel owner
router.post('/login', hotelOwnerController.loginHotelOwner); // Login route
router.get('/profile', authenticateToken, hotelOwnerController.getHotelOwnerProfile); // Profile route

// Generic routes after specific ones
router.get('/', hotelOwnerController.getAllHotelOwners); // Get all hotel owners
router.get('/:id', hotelOwnerController.getHotelOwnerById); // Get a hotel owner by ID
router.put('/:id', hotelOwnerController.updateHotelOwner); // Update a hotel owner by ID
router.delete('/:id', hotelOwnerController.deleteHotelOwner); // Delete a hotel owner by ID

module.exports = router; // Export the router
