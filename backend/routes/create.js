const express = require("express");
const Create = require("../models/create"); // Import your tour guide model

const router = express.Router();

// Create Route (Add a Tour Guide)
router.post('/add', async (req, res) => {
    const { name, email, address, number, experience, language, username, password } = req.body;

    try {
        const newCreate = new Create({
            name,
            email,
            address,
            number,
            experience,
            language,
            username,
            password,
            status: 'pending', // New field to track the tour guide's status
            isApproved: false  // Default to false until approved
        });

        await newCreate.save();
        res.json("Tour Guide Added Successfully");

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get All Tour Guides Route
router.get('/all', async (req, res) => {
    try {
        const allGuides = await Create.find();
        res.json(allGuides);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Approve Tour Guide Route
router.put('/approve/:id', async (req, res) => {
    try {
        const guide = await Create.findById(req.params.id);

        if (!guide) {
            return res.status(404).json({ error: "Tour Guide not found" });
        }

        guide.isApproved = true; // Mark as approved
        guide.status = 'approved';

        await guide.save();
        res.json("Tour Guide Approved");

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Update Tour Guide Route
router.put('/update/:id', async (req, res) => {
    try {
        const { name, email, address, number, experience, language } = req.body;
        const guide = await Create.findById(req.params.id);

        if (!guide) {
            return res.status(404).json({ error: "Tour Guide not found" });
        }

        // Update the guide's information
        guide.name = name;
        guide.email = email;
        guide.address = address;
        guide.number = number;
        guide.experience = experience;
        guide.language = language;

        await guide.save();
        res.json("Tour Guide Updated Successfully");

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Deny (Delete) Tour Guide Route
router.delete('/delete/:id', async (req, res) => {
    try {
        const guide = await Create.findByIdAndDelete(req.params.id);

        if (!guide) {
            return res.status(404).json({ error: "Tour Guide not found" });
        }

        res.json("Tour Guide Denied and Deleted Successfully");

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Approved Tour Guides Route
router.get('/approved', async (req, res) => {
    try {
        const approvedGuides = await Create.find({ isApproved: true });
        res.json(approvedGuides);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
