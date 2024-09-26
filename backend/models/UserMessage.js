const mongoose = require('mongoose');

const userMessageSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    message: { type: String, required: true },
    response: { type: String, default: '' },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, default: 'waiting' } // "waiting" or "responded"
});

module.exports = mongoose.model('UserMessage', userMessageSchema);
