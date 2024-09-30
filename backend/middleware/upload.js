const multer = require('multer');
const { GridFSBucket } = require('mongodb');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const util = require('util');

// Create MongoDB connection
const conn = mongoose.createConnection('mongodb+srv://vidura123:1234@boss.eobl4lm.mongodb.net/?retryWrites=true&w=majority&appName=boss');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadToGridFS = (req, res, next) => {
  if (!req.file) return next();

  const bucket = new GridFSBucket(conn.db, { bucketName: 'images' });

  const uploadStream = bucket.openUploadStream(req.file.originalname);
  uploadStream.end(req.file.buffer);

  req.file.uploadStream = uploadStream;
  req.file.filename = uploadStream.filename; 

  // Save to local filesystem
  const localPath = path.join(__dirname, '../uploads', req.file.originalname);
  const writeStream = fs.createWriteStream(localPath);
  writeStream.write(req.file.buffer);
  writeStream.end();
  
  writeStream.on('finish', () => {
    console.log(`File saved to ${localPath}`);
    next();
  });

  writeStream.on('error', (error) => {
    console.error('Error saving file locally:', error);
    next(error);
  });
};

module.exports = { upload, uploadToGridFS };
