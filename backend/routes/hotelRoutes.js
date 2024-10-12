const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const authenticateToken = require('../middleware/auth');
const { upload, uploadToGridFS } = require('../middleware/hotelUploads'); // Import upload middleware

// Route to add a new hotel with image uploads
router.post('/add', authenticateToken, upload.array('images', 10), uploadToGridFS, hotelController.addHotel);

// Route to get all approved hotels
router.get('/approved', hotelController.getHotels);

// Route to get hotels of the authenticated owner
router.get('/owner', authenticateToken, hotelController.getMyHotels);

// **New Routes for Update and Delete**
// Route to update a hotel
router.put('/:id', authenticateToken, upload.array('images', 10), uploadToGridFS, hotelController.updateHotel);

// Route to delete a hotel
router.delete('/:id', authenticateToken, hotelController.deleteHotel);

// Route to get all hotels (Admin Only)
router.get('/all', authenticateToken, hotelController.getAllHotels);





// Route to approve a hotel
router.patch('/:id/approve', authenticateToken, hotelController.approveHotel);

// Route to reject a hotel
router.patch('/:id/reject', authenticateToken, hotelController.rejectHotel);

// Route to delete a hotel
router.delete('/:id', authenticateToken, hotelController.deleteHotel);

module.exports = router;
