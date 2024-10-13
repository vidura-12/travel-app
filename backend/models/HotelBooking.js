// models/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User who made the booking
    required: true,
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel', // Reference to the Hotel being booked
    required: true,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the embedded Room's _id
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  numberOfGuests: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number, // Total price for the stay
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'cancelled'],
    default: 'active', // Status of the booking
  },
  cancellationReason: {
    type: String, // Reason provided by the user for cancellation
  },
}, { timestamps: true });

module.exports = mongoose.model('HotelBooking', BookingSchema);
