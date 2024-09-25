// models/feedback.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    feedbackCategory: { // Updated to match your requirement
        type: String,
        required: true
    },
    comment: { // Changed 'comment' to 'feedback' to match your terminology
        type: String,
        required: true
    },
    contact: { // New field for contact
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Feedback', postSchema);
