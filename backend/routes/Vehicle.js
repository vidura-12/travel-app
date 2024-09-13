const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicles');

router.post('/add', async (req, res) => {
  try {
    
    const existingVehicle = await Vehicle.findOne({ vnumber: req.body.vnumber });
    if (existingVehicle) {
      return res.status(400).json({ message: 'This Vehicle already exists' });
    }
    const newVehicle = new Vehicle({
      vnumber: req.body.vnumber,
      vtype: req.body.vtype,
      vmodel: req.body.vmodel,
      vyear: req.body.vyear,
      vcolor: req.body.vcolor,
      vseats: req.body.vseats,
      vprice: req.body.vprice,
      vstatus: req.body.vstatus,
      status: "not approved",
      picture: req.file ? req.file.originalname : null
    });
    
    await newVehicle.save();
    res.status(201).json(newVehicle);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }  
});
 
router.get('/all', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

router.get('/:id', async (req, res) => {    
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}); 

router.put('/:id', async (req, res) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
    res.status(200).json(updatedVehicle);
    } catch (error) {
        res.status(500).json({error: error.message});
        }
});

router.delete('/:id', async (req, res) => {
  try {
    await Vehicle.findByIdAndRemove(req.params.id);
    res.status(200).json({message: 'Vehicle deleted successfully'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// Route to search vehicle by vehicle type
router.get('/search/:vtype', async (req, res) => {
    const { vtype } = req.query;
    try {
        const vehicle = await Vehicle.findOne({
        vtype: { $regex: vtype, $options: "$i" },
        status: "approved"    
        });

        if (!vtype || vtype === "") {
            return res.status(404).json({ message: 'Vehicle not found with that name...!' });
        }
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;