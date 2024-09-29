const HotelOwner = require('../models/HotelOwner'); // Import the HotelOwner model
const bcrypt = require('bcrypt'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For generating tokens

// Create a new hotel owner
exports.createHotelOwner = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newOwner = new HotelOwner({ ...req.body, password: hashedPassword });
        const savedOwner = await newOwner.save();
        res.status(201).json(savedOwner);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Get all hotel owners
exports.getAllHotelOwners = async (req, res) => {
    try {
        const owners = await HotelOwner.find();
        res.status(200).json(owners);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Get a single hotel owner by ID
exports.getHotelOwnerById = async (req, res) => {
    try {
        const owner = await HotelOwner.findById(req.params.id);
        if (!owner) {
            return res.status(404).json({ message: 'Owner not found' });
        }
        res.status(200).json(owner);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Get the profile of the authenticated hotel owner
exports.getHotelOwnerProfile = async (req, res) => {
    try {
        const owner = await HotelOwner.findById(req.user.userId);
        if (!owner) {
            return res.status(404).json({ message: 'Hotel owner not found' });
        }
        res.status(200).json(owner);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a hotel owner by ID
exports.updateHotelOwner = async (req, res) => {
    try {
        const updatedOwner = await HotelOwner.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOwner) {
            return res.status(404).json({ message: 'Owner not found' });
        }
        res.status(200).json(updatedOwner);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Delete a hotel owner by ID
exports.deleteHotelOwner = async (req, res) => {
    try {
        const deletedOwner = await HotelOwner.findByIdAndDelete(req.params.id);
        if (!deletedOwner) {
            return res.status(404).json({ message: 'Owner not found' });
        }
        res.status(204).send(); // No content to return
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Login for hotel owner
exports.loginHotelOwner = async (req, res) => {
    const { email, password } = req.body;

    try {
        const owner = await HotelOwner.findOne({ email });
        if (!owner) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, owner.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: owner._id }, process.env.TOKEN, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
