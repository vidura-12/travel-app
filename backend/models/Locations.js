const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '../frontend/public/img'); // adjust the destination path as needed
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname); // use the original name of the file
  }
});

// Multer upload configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // limit file size if needed
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb); // check file type
  }
});

// Function to check file type
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


const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  picture: {
    type: String, 
  },
  status: {
    type: String, 
  }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = {
  Location,
  upload
};
