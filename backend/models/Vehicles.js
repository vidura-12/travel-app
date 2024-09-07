const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    vtype: {
        type: String,
        required: true
    },
    vnumber: {
        type: String,
        required: true
    },
    ownername: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    aircondition: {
        type: String,
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