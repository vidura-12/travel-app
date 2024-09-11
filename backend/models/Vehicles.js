const mongoose = require('mongoose');

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
    },
    make: {
        type: String,
        required: true, // Manufacturer of the vehicle (e.g., Toyota, Ford)
    },
    model: {
        type: String,
        required: true, // Model of the vehicle (e.g., Camry, Mustang)
    },
    year: {
        type: Number,
        required: true, // Manufacturing year
    },
    licensePlate: {
        type: String,
        required: true, // License plate number of the vehicle
        unique: true,   // Ensures the license plate is unique
    },
    type: {
        type: String,
        enum: ['Sedan', 'SUV', 'Truck', 'Van', 'Motorbike'], // Types of vehicles
        required: true,
    },
    rentalPricePerDay: {
        type: Number,
        required: true, // Price to rent the vehicle per day
    },
    isAvailable: {
        type: Boolean,
        default: true, // Whether the vehicle is available for rent
    },
    mileage: {
        type: Number,
        required: true, // Mileage of the vehicle
    },
    createdAt: {
        type: Date,
        default: Date.now, // Date when the vehicle was added to the system
    },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;