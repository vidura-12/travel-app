const multer = require('multer');
const { GridFSBucket } = require('mongodb');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

// Create MongoDB connection
const conn = mongoose.createConnection('mongodb+srv://vidura123:1234@boss.eobl4lm.mongodb.net/?retryWrites=true&w=majority&appName=boss');

// Initialize GridFSBucket once the connection is open
let bucket;
conn.once('open', () => {
    bucket = new GridFSBucket(conn.db, { bucketName: 'images' });
    console.log('Connected to MongoDB and GridFSBucket initialized.');
});

// Multer storage configuration (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware to upload to GridFS and save to local filesystem
const uploadToGridFS = async (req, res, next) => {
    if (!req.files || req.files.length === 0) return next();

    try {
        const uploadPromises = req.files.map(file => {
            return new Promise((resolve, reject) => {
                const uploadStream = bucket.openUploadStream(file.originalname);
                uploadStream.end(file.buffer, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    // Save to local filesystem
                    const localPath = path.join(__dirname, '../uploads', file.originalname);
                    fs.writeFile(localPath, file.buffer, (err) => {
                        if (err) {
                            return reject(err);
                        }
                        console.log(`File saved to ${localPath}`);
                        resolve(uploadStream.filename); // Return the filename from GridFS
                    });
                });
            });
        });

        const filenames = await Promise.all(uploadPromises);
        req.filenames = filenames; // Attach filenames to the request object
        next();
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).json({ message: 'Error uploading files.' });
    }
};

module.exports = { upload, uploadToGridFS };
