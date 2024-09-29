const HotelOwner = require('../models/HotelOwner'); // Import the HotelOwner model
const bcrypt = require('bcrypt'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For generating tokens

// Create a new hotel owner
exports.createHotelOwner = async (req, res) => {
    try {
        // Hash the password before saving the owner
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newOwner = new HotelOwner({ ...req.body, password: hashedPassword }); // Save hashed password
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

// Get the profile of the authenticated hotel owner
exports.getHotelOwnerProfile = async (req, res) => {
    try {
        const owner = await HotelOwner.findById(req.user.userId); // Fetch the owner by ID from the token
        if (!owner) {
            return res.status(404).json({ message: 'Hotel owner not found' });
        }
        res.json(owner); // Return the owner data
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

// Login for hotel owner
exports.loginHotelOwner = async (req, res) => {
    const { email, password } = req.body;

    try {
        const owner = await HotelOwner.findOne({ email }); // Find owner by email

        if (!owner) {
            return res.status(401).json({ message: 'Invalid credentials' }); // Handle invalid email
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, owner.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' }); // Handle invalid password
        }

        // Generate JWT token
        const token = jwt.sign({ userId: owner._id }, process.env.TOKEN, {
            expiresIn: '1h',
        });

        res.json({ token }); // Return the token
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};
