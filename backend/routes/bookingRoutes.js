const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { createBooking, getBookingsForOwner } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddlewareV');
const authenticateToken = require('../middleware/authMiddleware');


router.post('/bookings', authenticateToken, createBooking);

router.get('/bookings/owner',authenticateToken, getBookingsForOwner);

router.get('/bookings/owner', authMiddleware, bookingController.getBookingsForOwner);


module.exports = router;
