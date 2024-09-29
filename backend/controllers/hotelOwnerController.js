const HotelOwner = require('../models/HotelOwner'); // Import the HotelOwner model

// Create a new hotel owner
exports.createHotelOwner = async (req, res) => {
    try {
        const newOwner = new HotelOwner(req.body);
        const savedOwner = await newOwner.save();
        res.status(201).json(savedOwner); // Return the created owner with status 201
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

// Get all hotel owners
exports.getAllHotelOwners = async (req, res) => {
    try {
        const owners = await HotelOwner.find();
        res.status(200).json(owners); // Return the list of owners
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

// Get a single hotel owner by ID
exports.getHotelOwnerById = async (req, res) => {
    try {
        const owner = await HotelOwner.findById(req.params.id);
        if (!owner) {
            return res.status(404).json({ message: 'Owner not found' }); // Handle not found
        }
        res.status(200).json(owner); // Return the owner details
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

// Update a hotel owner by ID
exports.updateHotelOwner = async (req, res) => {
    try {
        const updatedOwner = await HotelOwner.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOwner) {
            return res.status(404).json({ message: 'Owner not found' }); // Handle not found
        }
        res.status(200).json(updatedOwner); // Return the updated owner details
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

// Delete a hotel owner by ID
exports.deleteHotelOwner = async (req, res) => {
    try {
        const deletedOwner = await HotelOwner.findByIdAndDelete(req.params.id);
        if (!deletedOwner) {
            return res.status(404).json({ message: 'Owner not found' }); // Handle not found
        }
        res.status(204).send(); // No content to return
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};
