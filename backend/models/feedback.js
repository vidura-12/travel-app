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
    feedbackCategory: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Feedback', postSchema);
