const express = require('express');
const router = express.Router();
const hotelOwnerController = require('../controllers/hotelOwnerController'); // Import the controller

// Routes for hotel owner management
router.post('/', hotelOwnerController.createHotelOwner); // Create a new hotel owner
router.get('/', hotelOwnerController.getAllHotelOwners); // Get all hotel owners
router.get('/:id', hotelOwnerController.getHotelOwnerById); // Get a hotel owner by ID
router.put('/:id', hotelOwnerController.updateHotelOwner); // Update a hotel owner by ID
router.delete('/:id', hotelOwnerController.deleteHotelOwner); // Delete a hotel owner by ID

module.exports = router; // Export the router
