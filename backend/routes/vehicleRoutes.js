const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const authMiddleware = require('../middleware/authMiddlewareV');
const { upload, uploadToGridFS } = require('../middleware/upload');
const { GridFSBucket } = require('mongodb');
const mongoose = require('mongoose');

// Load environment variables
require('dotenv').config();

// Create MongoDB connection using environment variable
const conn = mongoose.createConnection(process.env.MONGODB_URL || 'mongodb+srv://vidura:vidura123@cluster0.tl1vezg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// Serve images from GridFS
router.get('/image/:filename', (req, res) => {
    const bucket = new GridFSBucket(conn.db, { bucketName: 'images' });
    const downloadStream = bucket.openDownloadStreamByName(req.params.filename);

    downloadStream.on('error', (error) => {
        res.status(404).json({ message: 'Image not found' });
    });

    downloadStream.pipe(res);
});

router.post('/add', authMiddleware, upload.single('image'), uploadToGridFS, vehicleController.createVehicle);
router.get('/', vehicleController.getVehicles);
router.get('/:vehicleId', vehicleController.getVehicleById);
router.put('/:vehicleId', upload.single('image'), vehicleController.updateVehicle);
router.delete('/:vehicleId', vehicleController.deleteVehicle);

router.patch('/:vehicleId/status', vehicleController.updateVehicleStatus);

module.exports = router;