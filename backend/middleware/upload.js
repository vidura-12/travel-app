const multer = require('multer');
const { GridFSBucket } = require('mongodb');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

// Load environment variables
require('dotenv').config();

// Create MongoDB connection
const conn = mongoose.createConnection(process.env.MONGODB_URL);

// Multer storage configuration (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware to upload to GridFS and save to local filesystem
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