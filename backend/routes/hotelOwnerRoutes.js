const express = require('express');
const router = express.Router();
const hotelOwnerController = require('../controllers/hotelOwnerController');
// Instead of destructuring, import the middleware directly
const authenticateToken = require('../middleware/auth');

// Routes for hotel owner management
router.post('/', hotelOwnerController.createHotelOwner); // Create a new hotel owner
router.get('/', hotelOwnerController.getAllHotelOwners); // Get all hotel owners
router.get('/:id', hotelOwnerController.getHotelOwnerById); // Get a hotel owner by ID
router.put('/:id', hotelOwnerController.updateHotelOwner); // Update a hotel owner by ID
router.delete('/:id', hotelOwnerController.deleteHotelOwner); // Delete a hotel owner by ID
router.post('/login', hotelOwnerController.loginHotelOwner); // Login route

// New route to get the authenticated hotel owner's profile
router.get('/profile', authenticateToken, hotelOwnerController.getHotelOwnerProfile);

module.exports = router; // Export the router
