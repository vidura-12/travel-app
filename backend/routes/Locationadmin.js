const express = require('express');
const router = express.Router();
const { Location, upload } = require('../models/Locations'); 
const middle = require('../middleware/auth.js');


router.get('/', middle, async (req, res) => {
    const user = req.user;
    try {
      const locations = await Location.find();
      res.status(200).json(locations);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});


router.get('/locations-summary', middle, async (req, res) => {
    try {
      const locations = await Location.find({}, 'name likes comments'); // Only select name, likes, and comments
      res.json(locations);
    } catch (error) {
      console.error('Error fetching locations summary:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.delete('/delete/:id', middle, async (req, res) => {
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


router.put('/update/:id', middle, upload.single('picture'), async (req, res) => {
    try {
      const locationId = req.params.id;
      const updatedFields = {
        status: 'approved', 
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

module.exports = router;
