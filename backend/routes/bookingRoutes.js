const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { createBooking, getBookingsForOwner } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddlewareV');


router.post('/bookings', createBooking);

router.get('/bookings/owner',  getBookingsForOwner);

router.get('/bookings/owner', authMiddleware, bookingController.getBookingsForOwner);


module.exports = router;
