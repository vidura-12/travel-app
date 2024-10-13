const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    ownerEmail: {
        type: String,
        required: true,
    },
    make: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    numberOfSeats: {
        type: Number,
        required: true,
    },
    pricePerDay: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String, // Store the filename or URL of the image
    },
    status: {
        type: String,
        default: 'pending',
    },
    contact: {
        type: String,
        required: true,
    },
    ac: {
        type: String,
        required: true,
    },
    vnumber: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    }

}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
