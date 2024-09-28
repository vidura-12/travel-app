const Hotel = require('../models/Hotel');

// Create a new hotel
exports.createHotel = async (req, res) => {
    const { name, location, description, amenities, rooms, images } = req.body;

    try {
        const hotel = new Hotel({
            name,
            location,
            description,
            amenities,
            rooms,
            images, // Included images in the hotel object
            owner: req.user.userId // Ensure the owner is linked to the user ID from the request
        });
        await hotel.save();
        res.status(201).json(hotel); // Return the created hotel with a 201 status
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Server error' }); // Return a 500 status for server errors
    }
};

// Get all approved hotels
exports.getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find({ status: 'approved' }); // Query for approved hotels
        res.json(hotels); // Return the list of approved hotels
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Server error' }); // Return a 500 status for server errors
    }
};

// Approve a hotel by ID
exports.approveHotel = async (req, res) => {
    const { id } = req.params; // Extract hotel ID from request parameters

    try {
        const hotel = await Hotel.findByIdAndUpdate(id, { status: 'approved' }, { new: true }); // Update the hotel status to approved
        if (!hotel) {
            return res.status(404).json({ error: 'Hotel not found' }); // Handle case where hotel is not found
        }
        res.json(hotel); // Return the updated hotel
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Server error' }); // Return a 500 status for server errors
    }
};
