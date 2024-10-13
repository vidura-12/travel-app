const express = require('express');
const router = express.Router();
const vehicleOwnerController = require('../controllers/VehicleOwnerController');

router.post('/register', vehicleOwnerController.register); // Create a new vehicle owner

router.post('/login', vehicleOwnerController.login); // Login route

module.exports = router; // Export the router
