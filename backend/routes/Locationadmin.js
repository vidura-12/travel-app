const express = require('express');
const router = express.Router();
const { Location, upload } = require('../models/Locations'); 
const middle = require('../middleware/auth.js');


router.get('/', async (req, res) => {
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
router.delete('/locations/:locationId/comments/:commentId', middle, async (req, res) => {
  const { locationId, commentId } = req.params;

  try {
    const location = await Location.findById(locationId);

    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }

    // Filter out the comment to be deleted
    const updatedComments = location.comments.filter((comment) => comment._id.toString() !== commentId);

    if (updatedComments.length === location.comments.length) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    location.comments = updatedComments;

    await location.save();

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
