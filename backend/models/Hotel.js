const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    roomType: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    availableRooms: {
        type: Number,
        required: true,
    },
});

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    amenities: {
        type: [String],
    },
    rooms: {
        type: [RoomSchema],
        required: true, // Ensure at least one room is defined
    },
    images: {
        type: [String], // An array of strings for multiple image URLs
        required: true, // Ensure images are provided
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HotelOwner', // Reference to HotelOwner
        required: true, // Ensure an owner is assigned
    },
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

module.exports = mongoose.model('Hotel', HotelSchema);
