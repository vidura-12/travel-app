const Hotel = require('../models/Hotel');
const HotelOwner = require('../models/HotelOwner');

// Add a new hotel
exports.addHotel = async (req, res) => {
    try {
        const {
            name,
            location,
            description,
            amenities,
            rooms,
        } = req.body;

        // Validate required fields
        if (!name || !location || !rooms || !req.filenames || req.filenames.length === 0) {
            return res.status(400).json({ message: 'Missing required fields or images.' });
        }

        // Parse rooms from JSON string to object
        let parsedRooms;
        try {
            parsedRooms = JSON.parse(rooms);
            if (!Array.isArray(parsedRooms) || parsedRooms.length === 0) {
                throw new Error();
            }
        } catch (err) {
            return res.status(400).json({ message: 'Invalid rooms format. Must be a JSON array.' });
        }

        // Create a new Hotel instance
        const newHotel = new Hotel({
            name,
            location,
            description,
            amenities: amenities ? amenities.split(',').map(item => item.trim()) : [],
            rooms: parsedRooms,
            images: req.filenames, // Array of filenames from GridFS
            owner: req.user.userId, // Assuming userId is stored in req.user by middleware
        });

        // Save the hotel to the database
        const savedHotel = await newHotel.save();

        // Update the HotelOwner's hotels array
        await HotelOwner.findByIdAndUpdate(
            req.user.userId,
            { $push: { hotels: savedHotel._id } },
            { new: true }
        );

        res.status(201).json(savedHotel);
    } catch (error) {
        console.error('Error adding hotel:', error);
        res.status(500).json({ message: 'Server error while adding hotel.' });
    }
};

// Get all approved hotels
exports.getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find({ status: 'approved' }).populate('owner', 'name email phone'); // Query for approved hotels and populate owner details
        res.json(hotels); // Return the list of approved hotels
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Server error' }); // Return a 500 status for server errors
    }
};

// Get hotels for the authenticated owner
exports.getMyHotels = async (req, res) => {
    try {
        const owner = await HotelOwner.findById(req.user.userId).populate('hotels');
        if (!owner) {
            return res.status(404).json({ message: 'Hotel owner not found' });
        }
        res.json(owner.hotels); // Return only the hotels array
    } catch (error) {
        console.error('Error fetching owner\'s hotels:', error);
        res.status(500).json({ message: 'Server error while fetching hotels.' });
    }
};

// Other controller methods (e.g., updateHotel, deleteHotel) can be added here
