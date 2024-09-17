const express = require('express');
const router = express.Router();
const VehicleOwner = require('../models/VehicleOwner');

// Route to add a new vehicle owner
router.post('/add', async (req, res) => {
  try {
    const existingOwner = await VehicleOwner.findOne({ email: req.body.email });
    if (existingOwner) {
      return res.status(400).json({ error: 'Vehicle owner already exists' });
    }

    const newOwner = new VehicleOwner({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      status: "not approved"
    });

    await newOwner.save();

    res.status(201).json(newOwner);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});

// Route to get all vehicle owners
router.get('/all', async (req, res) => {
  try {
    const owners = await VehicleOwner.find();
    res.status(200).json(owners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get a single vehicle owner
router.get('/:id', async (req, res) => {
  try {
    const owner = await VehicleOwner.findById(req.params.id);
    res.status(200).json(owner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to update a vehicle owner
router.put('/:id', async (req, res) => {
  try {
    const updatedOwner = await VehicleOwner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedOwner);
    } catch (err) {
        res.status(500).json({ error: err.message });
        }
});

// Route to delete a vehicle owner
router.delete('/:id', async (req, res) => {
  try {
    const owner = await VehicleOwner.findByIdAndDelete(req.params.id);
    res.status(200).json(owner);
    res.json({ message: 'Vehicle owner deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;