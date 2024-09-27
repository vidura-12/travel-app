const mongoose = require("mongoose");
const express = require('express');
const Feedback = require('../models/feedback');

const router = express.Router();

// Save feedback
router.post('/save', async (req, res) => {
    const { name, email, feedbackCategory, comment, contact } = req.body; // Added contact

    try {
        const newCreate = new Feedback({
            name,
            email,
            feedbackCategory,
            comment,
            contact // Added contact to the new feedback object
        });

        await newCreate.save();
        res.json("Successful");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read all feedbacks
router.get('/all', async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read a specific feedback by ID
router.get("/:id", async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        res.json(feedback);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a specific feedback by ID
router.put('/update/:id', async (req, res) => {
    const { name, email, feedbackCategory, comment, contact } = req.body; // Added contact

    try {
        const updatedFeedback = await Feedback.findByIdAndUpdate(
            req.params.id,
            {
                name,
                email,
                feedbackCategory,
                comment,
                contact // Added contact to the update
            },
            { new: true } // This option returns the updated document
        );

        if (!updatedFeedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        res.json({ message: "Feedback updated successfully", updatedFeedback });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a specific feedback by ID
router.delete("/delete/:id", async (req, res) => {
    try {
        const deletedFeedback = await Feedback.findOneAndDelete(req.params.email);

        if (!deletedFeedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        res.json({ message: "Feedback deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
