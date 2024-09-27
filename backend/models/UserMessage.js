const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    messageId: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Auto-generated ID for the message
    userId: { type: String, required: true }, // This will hold the email
    message: { type: String, required: true },
    response: { type: String, default: '' },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, default: 'waiting' }, // "waiting" or "responded"
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' } // Reference to another message if it's a reply
});

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    messages: [messageSchema] // Array of messages
});

// Use a conditional check to define the model only once
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
