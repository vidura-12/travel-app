const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

const { upload, uploadToGridFS } = require('../middleware/upload');
const { GridFSBucket } = require('mongodb');
const mongoose = require('mongoose');

const conn = mongoose.createConnection('mongodb+srv://vidura123:1234@boss.eobl4lm.mongodb.net/?retryWrites=true&w=majority&appName=boss');

// Serve images from GridFS
router.get('/image/:filename', (req, res) => {
    const bucket = new GridFSBucket(conn.db, { bucketName: 'images' });
    const downloadStream = bucket.openDownloadStreamByName(req.params.filename);

    downloadStream.on('error', (error) => {
        res.status(404).json({ message: 'Image not found' });
    });

    downloadStream.pipe(res);
});


router.post('/add', upload.single('image'), uploadToGridFS, vehicleController.createVehicle);
router.get('/', vehicleController.getVehicles);
router.get('/:vehicleId', vehicleController.getVehicleById);
router.put('/:vehicleId', upload.single('image'), vehicleController.updateVehicle);
router.delete('/:vehicleId', vehicleController.deleteVehicle);

router.patch('/:vehicleId/status', vehicleController.updateVehicleStatus);

module.exports = router;
