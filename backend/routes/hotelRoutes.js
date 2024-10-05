// backend/routes/hotelRoutes.js

const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const hotelOwnerController = require('../controllers/hotelOwnerController');
const  authenticateToken  = require('../middleware/auth');
const { upload, uploadToGridFS } = require('../middleware/upload'); // Import upload middleware

// Route to add a new hotel with image uploads
router.post('/add', authenticateToken, upload.array('images', 10), uploadToGridFS, hotelController.addHotel);

// Route to get all approved hotels
router.get('/approved', hotelController.getHotels);

// New route to get hotels of the authenticated owner
router.get('/owner', authenticateToken, hotelController.getMyHotels);

// Export the router
module.exports = router;
