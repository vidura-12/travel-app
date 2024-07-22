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
