const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const { Package, upload } = require('../models/packages'); 



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
      image: req.file ? req.file.originalname : null  
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

// Update a package by ID
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updatedData = {
      agencyName: req.body.agencyName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      location: req.body.location,
      places: req.body.places.split(','),
      maxPeople: req.body.maxPeople,
      price: req.body.price,
    };

    if (req.file) {
      updatedData.image = req.file.originalname;
    }

    const updatedPackage = await Package.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedPackage) return res.status(404).json({ message: 'Package not found' });

    res.json(updatedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const packageId = req.params.id;

    const deletedpackage = await  Package.findByIdAndDelete(packageId);

    if (!deletedpackage) return res.status(404).json({ message: 'Package not found' });

    res.status(200).json({ message: 'Package deleted successfully' });
  } catch (error) {

    res.status(200).json({ message: 'error' });
  } 
});
 
  



module.exports = router;



