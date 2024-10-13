const Hotel = require('../models/Hotel');
const HotelOwner = require('../models/HotelOwner');

// Add a new hotel
exports.addHotel = async (req, res) => {
    try {
        const { name, location, description, amenities, rooms } = req.body;

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
        const hotels = await Hotel.find({ status: 'approved' }).populate('owner', 'name email phone');
        res.json(hotels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get hotels for the authenticated owner
exports.getMyHotels = async (req, res) => {
    try {
        const owner = await HotelOwner.findById(req.user.userId).populate('hotels');
        if (!owner) {
            return res.status(404).json({ message: 'Hotel owner not found' });
        }
        res.json(owner.hotels);
    } catch (error) {
        console.error('Error fetching owner\'s hotels:', error);
        res.status(500).json({ message: 'Server error while fetching hotels.' });
    }
};

// Update a hotel
exports.updateHotel = async (req, res) => {
    try {
        const hotelId = req.params.id;
        const userId = req.user.userId;

        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found.' });
        }

        if (hotel.owner.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized to update this hotel.' });
        }

        const { name, location, description, amenities, rooms } = req.body;

        if (name) hotel.name = name;
        if (location) hotel.location = location;
        if (description) hotel.description = description;
        if (amenities) hotel.amenities = amenities.split(',').map(item => item.trim());
        if (rooms) {
            let parsedRooms;
            try {
                parsedRooms = JSON.parse(rooms);
                if (!Array.isArray(parsedRooms)) {
                    throw new Error();
                }
                hotel.rooms = parsedRooms;
            } catch (err) {
                return res.status(400).json({ message: 'Invalid rooms format. Must be a JSON array.' });
            }
        }

        if (req.filenames && req.filenames.length > 0) {
            hotel.images = [...hotel.images, ...req.filenames];
        }

        const updatedHotel = await hotel.save();

        res.status(200).json(updatedHotel);
    } catch (error) {
        console.error('Error updating hotel:', error);
        res.status(500).json({ message: 'Server error while updating hotel.' });
    }
};

// Delete a hotel
exports.deleteHotel = async (req, res) => {
    try {
        const hotelId = req.params.id;
        const userId = req.user.userId;

        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found.' });
        }

        if (hotel.owner.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized to delete this hotel.' });
        }

        await Hotel.findByIdAndDelete(hotelId);

        await HotelOwner.findByIdAndUpdate(
            userId,
            { $pull: { hotels: hotelId } },
            { new: true }
        );

        res.status(200).json({ message: 'Hotel deleted successfully.' });
    } catch (error) {
        console.error('Error deleting hotel:', error);
        res.status(500).json({ message: 'Server error while deleting hotel.' });
    }
    
};

// Get all hotels (Admin Only)
exports.getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find().populate('owner', 'name email phone');
        res.json(hotels);
    } catch (error) {
        console.error('Error fetching all hotels:', error);
        res.status(500).json({ message: 'Server error while fetching hotels.' });
    }
};






// Approve a hotel
exports.approveHotel = async (req, res) => {
    try {
        const hotelId = req.params.id;

        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found.' });
        }

        // Check if the authenticated user is the hotel owner or a hotel manager
        if (hotel.owner.toString() !== req.user.userId && req.user.role !== 'hotel_manager') {
            return res.status(403).json({ message: 'Unauthorized to approve this hotel.' });
        }

        hotel.status = 'approved';
        await hotel.save();

        res.status(200).json({ message: 'Hotel approved successfully.' });
    } catch (error) {
        console.error('Error approving hotel:', error);
        res.status(500).json({ message: 'Server error while approving hotel.' });
    }
};

// Reject a hotel
exports.rejectHotel = async (req, res) => {
    try {
        const hotelId = req.params.id;

        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found.' });
        }

        // Check if the authenticated user is the hotel owner or a hotel manager
        if (hotel.owner.toString() !== req.user.userId && req.user.role !== 'hotel_manager') {
            return res.status(403).json({ message: 'Unauthorized to reject this hotel.' });
        }

        hotel.status = 'rejected';
        await hotel.save();

        res.status(200).json({ message: 'Hotel rejected successfully.' });
    } catch (error) {
        console.error('Error rejecting hotel:', error);
        res.status(500).json({ message: 'Server error while rejecting hotel.' });
    }
};

// Delete a hotel
exports.deleteHotel = async (req, res) => {
    try {
        const hotelId = req.params.id;

        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found.' });
        }

        // Check if the authenticated user is the hotel owner or a hotel manager
        if (hotel.owner.toString() !== req.user.userId && req.user.role !== 'hotel_manager') {
            return res.status(403).json({ message: 'Unauthorized to delete this hotel.' });
        }

        await Hotel.findByIdAndDelete(hotelId);

        await HotelOwner.findByIdAndUpdate(
            req.user.userId,
            { $pull: { hotels: hotelId } },
            { new: true }
        );

        res.status(200).json({ message: 'Hotel deleted successfully.' });
    } catch (error) {
        console.error('Error deleting hotel:', error);
        res.status(500).json({ message: 'Server error while deleting hotel.' });
    }
};