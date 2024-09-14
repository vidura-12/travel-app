const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

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

// Define the package schema
const packageSchema = new mongoose.Schema({
  agencyName: { 
    type: String, 
    required: true 
  },
  phoneNumber: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  places: { 
    type: [String], 
    required: true 
  },
  maxPeople: { 
    type: Number, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  image: { 
    type: String, 
    required: true 
  },
});

// Create the model
const Package = mongoose.model('Package', packageSchema);

module.exports = {
  Package,
  upload
};
