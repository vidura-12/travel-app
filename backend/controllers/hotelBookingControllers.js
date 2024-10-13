// controllers/bookingController.js
const Booking = require('../models/HotelBooking'); // Updated to correct path
const Hotel = require('../models/Hotel');

const mongoose = require('mongoose');

/**
 * Create a Booking
 * @route POST /api/bookings
 * @access Private (User)
 */
const createBooking = async (req, res) => {
  try {
    const { hotelId, roomId, checkInDate, checkOutDate, numberOfGuests } = req.body;
    const userId = req.user.userId; // Correct extraction

    // Log incoming request details
    console.log("Create Booking Request:", {
      userId,
      hotelId,
      roomId,
      checkInDate,
      checkOutDate,
      numberOfGuests
    });

    // Validate input
    if (!hotelId || !roomId || !checkInDate || !checkOutDate || !numberOfGuests) {
      console.error("Validation Error: Missing fields.");
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Ensure check-in date is before check-out date
    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      console.error("Validation Error: Check-out date must be after check-in date.");
      return res.status(400).json({ message: 'Check-out date must be after check-in date.' });
    }

    // Find the hotel
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      console.error(`Booking Error: Hotel with ID ${hotelId} not found.`);
      return res.status(404).json({ message: 'Hotel not found.' });
    }

    // Find the room within the hotel's rooms array
    const room = hotel.rooms.id(roomId);
    if (!room) {
      console.error(`Booking Error: Room with ID ${roomId} not found in Hotel ID ${hotelId}.`);
      return res.status(404).json({ message: 'Room not found.' });
    }

    // Check room availability for the requested date range
    const overlappingBookings = await Booking.countDocuments({
      hotel: hotelId,
      roomId: roomId,
      status: 'active',
      $or: [
        {
          checkInDate: { $lte: new Date(checkOutDate) },
          checkOutDate: { $gte: new Date(checkInDate) },
        },
      ],
    });

    console.log(`Overlapping Bookings: ${overlappingBookings} for Room ID: ${roomId}`);

    if (overlappingBookings >= room.availableRooms) {
      console.error(`Booking Error: No available rooms for Room ID ${roomId} in the selected date range.`);
      return res.status(400).json({ message: 'No available rooms for the selected type and dates.' });
    }

    // Calculate total price
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = Math.abs(checkOut - checkIn);
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    const totalPrice = days * room.price;

    // Create booking
    const booking = new Booking({
      user: userId,
      hotel: hotelId,
      roomId: roomId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      numberOfGuests,
      totalPrice,
    });

    await booking.save();

    console.log("Booking created successfully:", booking);
    res.status(201).json({ message: 'Booking created successfully.', booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * Cancel a Booking
 * @route DELETE /api/bookings/:id
 * @access Private (User)
 */
const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user.userId; // Updated to use userId
    const { cancellationReason } = req.body;

    // Validate booking ID
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ message: 'Invalid booking ID.' });
    }

    // Find the booking
    const booking = await Booking.findOne({ _id: bookingId, user: userId }).populate('hotel');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    // Check if already cancelled
    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking is already cancelled.' });
    }

    // Update booking status and add cancellation reason
    booking.status = 'cancelled';
    if (cancellationReason) {
      booking.cancellationReason = cancellationReason;
    }
    await booking.save();

    res.status(200).json({ message: 'Booking cancelled successfully.', booking });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * Get All Bookings (Admin)
 * @route GET /api/bookings/admin
 * @access Private (Admin)
 */
const getAllBookings = async (req, res) => {
  try {
    // Ensure the user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied.' });
    }

    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('hotel', 'name location')
      .populate('hotel'); // To access room details, you may need to populate manually

    res.status(200).json({ bookings });
  } catch (error) {
    console.error('Error fetching all bookings:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * Get Bookings for Hotel Owner
 * @route GET /api/bookings/owner
 * @access Private (Hotel Owner)
 */
const getOwnerBookings = async (req, res) => {
  try {
    // Ensure the user is a hotel owner
    if (req.user.role !== 'hotelOwner') {
      return res.status(403).json({ message: 'Access denied.' });
    }

    const ownerId = req.user.userId; // Updated to use userId

    // Find all hotels owned by this owner
    const hotels = await Hotel.find({ owner: ownerId }).select('_id');
    const hotelIds = hotels.map(hotel => hotel._id);

    // Find all bookings for these hotels
    const bookings = await Booking.find({ hotel: { $in: hotelIds } })
      .populate('user', 'name email')
      .populate('hotel', 'name location');

    res.status(200).json({ bookings });
  } catch (error) {
    console.error('Error fetching owner bookings:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * Get Bookings for User
 * @route GET /api/bookings/user
 * @access Private (User)
 */
const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.userId; // Updated to use userId

    const bookings = await Booking.find({ user: userId })
      .populate('hotel', 'name location');

    res.status(200).json({ bookings });
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * Get Available Rooms for a Hotel and Date Range
 * @route GET /api/bookings/available-rooms
 * @access Private (User)
 */
const getAvailableRooms = async (req, res) => {
  try {
    const { hotelId, checkInDate, checkOutDate } = req.query;

    // Validate input
    if (!hotelId || !checkInDate || !checkOutDate) {
      return res.status(400).json({ message: 'hotelId, checkInDate, and checkOutDate are required.' });
    }

    // Ensure check-in date is before check-out date
    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      return res.status(400).json({ message: 'Check-out date must be after check-in date.' });
    }

    // Find the hotel
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found.' });
    }

    const availableRooms = [];

    for (const room of hotel.rooms) {
      const overlappingBookings = await Booking.countDocuments({
        hotel: hotelId,
        roomId: room._id,
        status: 'active',
        $or: [
          {
            checkInDate: { $lte: new Date(checkOutDate) },
            checkOutDate: { $gte: new Date(checkInDate) },
          },
        ],
      });

      const remainingRooms = room.availableRooms - overlappingBookings;

      if (remainingRooms > 0) {
        availableRooms.push({
          roomId: room._id,
          roomType: room.roomType,
          price: room.price,
          available: remainingRooms,
        });
      }
    }

    res.status(200).json({ availableRooms });
  } catch (error) {
    console.error('Error fetching available rooms:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createBooking,
  cancelBooking,
  getAllBookings,
  getOwnerBookings,
  getUserBookings,
  getAvailableRooms,
};
