const express = require('express');
const router = express.Router();
const { Location, upload } = require('../models/Locations'); 

// Route to add a new location
router.post('/add', upload.single('picture'), async (req, res) => {
  try {
    
    const existingLocation = await Location.findOne({ name: req.body.name });
    if (existingLocation) {
      return res.status(400).json({ error: 'Location name already exists' });
    }

    
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


// Route to search locations by city
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


// Route to increment likes for a location
router.post('/like/:id', async (req, res) => {
  try {
    const locationId = req.params.id;
    const location = await Location.findById(locationId);

    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }

    location.likes += 1;
    await location.save();

    res.status(200).json(location);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to add a comment to a location
router.post('/comment/:id', async (req, res) => {
  try {
    const locationId = req.params.id;
    const location = await Location.findById(locationId);

    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }

    const comment = {
      text: req.body.text,
    };

    location.comments.push(comment);
    await location.save();

    res.status(200).json(location);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
