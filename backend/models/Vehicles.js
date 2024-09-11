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
    }
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;