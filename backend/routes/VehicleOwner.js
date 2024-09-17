const express = require('express');
const router = express.Router();
const VehicleOwner = require('../models/VehicleOwner');

// Create a new vehicle owner
router.post('/add', async (req, res) => {
    try {
        const { name, age, email, username, password, phoneNumber, address } = req.body;

        // Check if the vehicle owner with the same email already exists
        const existingVehicleOwner = await VehicleOwner.findOne({ email });
        if (existingVehicleOwner) {
            return res.status(400).json({ message: 'This Vehicle Owner already exists' });
        }

        // Create a new vehicle owner instance
        const newVehicleOwner = new VehicleOwner({
            name,
            age,
            email,
            username,
            password,
            phoneNumber, // Fixed field name to match the model
            address,
        });

        // Save the new vehicle owner to the database
        await newVehicleOwner.save();

        res.status(201).json({ message: 'Vehicle Owner added successfully', data: newVehicleOwner });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all vehicle owners
router.get('/', async (req, res) => {
    try {
        const vehicleOwners = await VehicleOwner.find();
        res.status(200).json(vehicleOwners);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single vehicle owner
router.get('/:id', async (req, res) => {
    try {
        const vehicleOwner = await VehicleOwner.findById(req.params.id);
        res.status(200).json(vehicleOwner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a vehicle owner
router.put('/:id', async (req, res) => {
    try {
        const updatedVehicleOwner = await VehicleOwner.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Return the updated document, validate the update
        );

        if (!updatedVehicleOwner) {
            return res.status(404).json({ message: 'Vehicle Owner not found' });
        }

        res.status(200).json({ message: 'Vehicle Owner updated successfully', data: updatedVehicleOwner });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a vehicle owner
router.delete('/:id', async (req, res) => {
    try {
        await VehicleOwner.findByIdAndRemove(req.params.id);
        res.status(200).json({ message: 'Vehicle Owner deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;