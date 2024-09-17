const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

// Multer configuration
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

// Mongoose schema and model
const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: { 
        type: String,
        required: true
    },
    location: { 
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true 
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
    },
    ticketCriteria: {
        t1: String,
        t2: String,
        t3: String,
        t4: String,
        t5: String,
        t6: String,
        t7: String
    },
    userTickets: [
        {
            tname: String,
            phone: String,
            email: String,
            otherFields: Map // Map for dynamic fields
        }
    ]
});

const Events = mongoose.model("events", eventSchema);

module.exports = {
    Events,
    upload
};
