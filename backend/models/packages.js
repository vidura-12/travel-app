const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the directory exists before uploading
const uploadDir = path.join(__dirname, '../frontend/public/img');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage for multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadDir); // Ensure consistent directory usage
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname); 
  }
});

// Initialize multer with storage, file size limits, and file filter
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10MB file size limit
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb); 
  }
});

// Function to check the file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Images Only!')); // Return an Error object
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
