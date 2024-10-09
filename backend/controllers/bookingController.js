const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');

exports.createBooking = async (req, res) => {
    const { vehicleId, userName, userEmail, userPhoneNumber, numberOfDays, additionalNotes, licenseId, startDate, totalCost } = req.body;

    try {
        // Validate required fields
        if (!vehicleId || !userName || !userEmail || !userPhoneNumber || !numberOfDays || !licenseId || !startDate || !totalCost) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Parse startDate to Date object
        const parsedStartDate = new Date(startDate);
        const returnDate = new Date(parsedStartDate);
        returnDate.setDate(returnDate.getDate() + parseInt(numberOfDays, 10));

        const booking = new Booking({
            vehicleId,
            userName,
            userEmail,
            userPhoneNumber,
            numberOfDays,
            startDate: parsedStartDate,
            returnDate: returnDate,
            totalCost,
            additionalNotes,
            licenseId
        });

        await booking.save();
        res.status(201).json({ message: 'Booking created successfully' });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Server error' });
    }
};




exports.getBookingsForOwner = async (req, res) => {
    try {
        console.log('Received request to get bookings for owner');

        // Check for user and email
        if (!req.user || !req.user.email) {
            console.error('No email found in JWT payload');
            return res.status(400).json({ success: false, message: 'No email found' });
        }

        const { email } = req.user; // Extract email from req.user
        console.log('Extracted email from JWT:', email);

        const vehicles = await Vehicle.find({ email });
        console.log('Found vehicles for the owner:', vehicles);

        if (vehicles.length === 0) {
            console.log('No vehicles found for the owner');
            return res.json({ success: true, data: [] });
        }

        const vehicleIds = vehicles.map(vehicle => vehicle._id);
        console.log('Extracted vehicle IDs:', vehicleIds);

        const bookings = await Booking.find({ vehicleId: { $in: vehicleIds } }).populate('vehicleId');
        console.log('Found bookings for the owner:', bookings);

        res.json({ success: true, data: bookings });
    } catch (error) {
        console.error('Error fetching bookings:', error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch bookings', error: error.stack });
    }
};