const express = require('express');
const router = express.Router();
const { Location, upload } = require('../models/Locations'); 


router.post('/add', upload.single('picture'), async (req, res) => {
  try {
    const newLocation = new Location({
      name: req.body.name,
      city: req.body.city,
      description: req.body.description,
      status: "not approved",
      picture: req.file ? req.file.originalname : null 
    });

    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
    try {
      const locations = await Location.find();
      res.status(200).json(locations);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.put('/update/:id', upload.single('picture'), async (req, res) => {
    try {
      const locationId = req.params.id;
      const { name, city, description,status } = req.body;
      const updatedFields = {
        name,
        city,
        description,
        status,
        picture: req.file ? req.file.path : null, 
        
      };
  

      const updatedLocation = await Location.findByIdAndUpdate(locationId, updatedFields, { new: true });
  
      if (!updatedLocation) {
        return res.status(404).json({ error: 'Location not found' });
      }
  
      res.status(200).json(updatedLocation);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.delete('/delete/:id', async (req, res) => {
    try {
      const locationId = req.params.id;
  
      const deletedLocation = await Location.findByIdAndDelete(locationId);
  
      if (!deletedLocation) {
        return res.status(404).json({ error: 'Location not found' });
      }
  
      res.status(200).json({ message: 'Location deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.get('/search', async (req, res) => {
    const { city } = req.query;
    try {
      const locations = await Location.find({
        city: { $regex: `^${city}`, $options: 'i' },
        status: 'approved' 
      });
      
      if (!locations || locations.length === 0) {
        return res.status(404).json({ error: 'No locations found with that name.' });
      }
      
      res.status(200).json(locations);
    } catch (err) {
      console.error('Error fetching locations:', err);
      res.status(500).json({ error: err.message });
    }
  });
  

module.exports = router;


