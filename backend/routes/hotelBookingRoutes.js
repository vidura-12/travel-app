// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const {
  createBooking,
  cancelBooking,
  getAllBookings,
  getOwnerBookings,
  getUserBookings,
  getAvailableRooms,
} = require('../controllers/hotelBookingControllers');
const authenticateToken = require('../middleware/authMiddleware');

// Create a new booking
// POST /api/bookings
router.post('/', authenticateToken, createBooking);

// Cancel a booking by ID
// DELETE /api/bookings/:id
router.delete('/:id', authenticateToken, cancelBooking);

// Get all bookings (Admin)
// GET /api/bookings/admin
router.get('/admin', authenticateToken, getAllBookings);

// Get bookings for hotel owner
// GET /api/bookings/owner
router.get('/owner', authenticateToken, getOwnerBookings);

// Get bookings for the logged-in user
// GET /api/bookings/user
router.get('/user', authenticateToken, getUserBookings);

// Get available rooms for a hotel and date range
// GET /api/bookings/available-rooms
router.get('/available-rooms', authenticateToken, getAvailableRooms);

module.exports = router;
