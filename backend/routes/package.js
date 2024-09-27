const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const { Package, upload } = require('../models/packages');
const middle = require('../middleware/auth.js');
// Create a new package
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
      image: req.file ? req.file.originalname : null,  // Added comma here
      status: "not approved",
    });
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all approved packages
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find(); // Filter by approved status
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/get', async (req, res) => {
  try {
    const packages = await Package.find({status: 'approved'} ); // Filter by approved status
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
router.put('/update/:id', middle, upload.single('picture'), async (req, res) => {
  try {
    const packageId = req.params.id;
    const updatedFields = { status: 'approved' }; // Change status to "approved"

    const updatedPackage = await Package.findByIdAndUpdate(packageId, updatedFields, { new: true });
console.log(updatedPackage);
    if (!updatedPackage) {
      return res.status(404).json({ error: 'Package not found' });
    }

    res.status(200).json(updatedPackage); // Return updated package data
  } catch (err) {
    res.status(400).json({ error: err.message }); // Log the error
    console.error('Error updating package:', err); // Log for debugging
  }
});



// Delete a package by ID
router.delete('/:id', async (req, res) => {
  try {
    const packageId = req.params.id;
    const deletedPackage = await Package.findByIdAndDelete(packageId);

    if (!deletedPackage) return res.status(404).json({ message: 'Package not found' });

    res.status(200).json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });  // Changed status to 500 for errors
  }
});

module.exports = router;
