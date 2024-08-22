const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const Package = require('../models/packages');


//test
router.get("/test",(req,res)=>res.send("It's working"));

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.post('/create', upload.single('image'), async (req, res) => {
  try {
    const newPackage = new Package({
      agencyName: req.body.agencyName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      location: req.body.location,
      places: req.body.places,
      maxPeople: req.body.maxPeople,
      price: req.body.price,
      image: req.file.path,
    });
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all packages
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;



