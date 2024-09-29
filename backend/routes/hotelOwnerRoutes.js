const express = require('express');
const router = express.Router();
const hotelOwnerController = require('../controllers/hotelOwnerController'); // Ensure this path is correct
const { authenticateToken } = require('../middleware/auth'); // Import your token verification middleware

// Routes for hotel owner management
router.post('/', hotelOwnerController.createHotelOwner); // Create a new hotel owner
router.get('/', hotelOwnerController.getAllHotelOwners); // Get all hotel owners
router.get('/:id', hotelOwnerController.getHotelOwnerById); // Get a hotel owner by ID
router.put('/:id', hotelOwnerController.updateHotelOwner); // Update a hotel owner by ID
router.delete('/:id', hotelOwnerController.deleteHotelOwner); // Delete a hotel owner by ID
router.post('/login', hotelOwnerController.loginHotelOwner); // Login route

// New route to get the authenticated hotel owner's profile
router.get('/profile', authenticateToken, hotelOwnerController.getHotelOwnerProfile);
 // Get the profile of the authenticated hotel owner
 

module.exports = router; // Export the router
