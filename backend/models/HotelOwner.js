const mongoose = require('mongoose');

const HotelOwnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure the email is unique
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    hotels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel', // Reference to the Hotel model
    }],
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

module.exports = mongoose.model('HotelOwner', HotelOwnerSchema);
