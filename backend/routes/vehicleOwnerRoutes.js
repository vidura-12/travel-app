const express = require('express');
const router = express.Router();
const vehicleOwnerController = require('../controllers/VehicleOwnerController');
const authMiddleware = require('../middleware/authMiddlewareV');


router.post('/register', vehicleOwnerController.register); // Create a new vehicle owner

router.post('/login', vehicleOwnerController.login); // Login route

router.get('/profile',  authMiddleware, vehicleOwnerController.getVehicleOwnerProfile); // Get vehicle owner profile

module.exports = router; // Export the router
