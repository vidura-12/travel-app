const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    vname: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    amenities: {
        type: [String],
        required: true
    },
    // Add more fields as per your requirements

    // Timestamps for created and updated dates
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Hotel = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;