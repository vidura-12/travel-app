const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../frontend/public/img');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
});

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}
const vehicleSchema = new mongoose.Schema({
    
    // Types of vehicles
    vtype: {
        type: String,
        enum: ['Sedan', 'SUV', 'Truck', 'Van', 'Motorbike'], 
        required: true,
    },

    // License plate number of the vehicle
    licensePlate: {
        type: String,
        required: true, 
        unique: true,   // Ensures the license plate is unique
    },   
    
    // Owner of the vehicle
    ownername: {
        type: String,
        required: true
    },

    // Number of seats in the vehicle
    seats: {
        type: Number,
        required: true
    },

    // Price per day to rent the vehicle
    rentalPricePerDay: {
        type: Number,
        required: true, 
    },

    // Status of the vehicle aircondition
    aircondition: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },

    // Model of the vehicle (e.g., Camry, Mustang)
    model: {
        type: String,
        required: true, 
    },

    // Manufacturing year
    year: {
        type: Number,
        required: true, 
    },

    // Color of the vehicle
    color: {
        type: String,
        required: true, 
    },

    // Date when the vehicle was added to the system
    createdAt: {
        type: Date,
        default: Date.now, 
    },

    // Array of URLs to the vehicle's pictures
    vpictures: {
        type: [String], 
    },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;