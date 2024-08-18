// routes/feedback.js
const mongoose = require("mongoose");
const express = require('express');
const Feedback = require('../models/feedback');

const router = express.Router();

// Save feedback
router.post('/save', (req, res) => {
    let newPost = new Feedback(req.body);

    newPost.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Feedback saved successfully"
        });
    });
});

module.exports = router;
