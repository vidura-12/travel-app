const express = require("express");
const router = express.Router();
const { Events, upload } = require('../models/Event');
const nodemailer = require('nodemailer');
const path = require('path');



// Add event
const { body, validationResult } = require('express-validator');


router.post('/add', 
  upload.single('image'), 
  [
    body('name').notEmpty().withMessage('Name is required').isLength({ max: 100 }).withMessage('Name must be at most 100 characters long'),
    body('category').notEmpty().withMessage('Category is required'),
    body('description').notEmpty().withMessage('Description is required').isLength({ max: 500 }).withMessage('Description must be at most 500 characters long'),
    body('location').notEmpty().withMessage('Location is required'),
    body('date').notEmpty().withMessage('Date is required').isISO8601().withMessage('Date must be a valid date'),
    body('time').notEmpty().withMessage('Time is required'),
    body('price').notEmpty().withMessage('Price is required').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('t1').optional().isLength({ max: 100 }).withMessage('Ticket criteria must be at most 100 characters long'),
    body('t2').optional().isLength({ max: 100 }),
    body('t3').optional().isLength({ max: 100 }),
    body('t4').optional().isLength({ max: 100 }),
    body('t5').optional().isLength({ max: 100 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    
    const { name, category, description, location, date, time, price, t1, t2, t3, t4, t5, t6, t7 } = req.body;
    const image = req.file ? req.file.originalname : null;

    try {
      const newEvent = new Events({
        name,
        category,
        description,
        location,
        date,
        time,
        price,
        image,
        ticketCriteria: { t1, t2, t3, t4, t5 }
      });

      await newEvent.save();
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);
 

// Get all events
router.get("/", async (req, res) => {
    try {
        const events = await Events.find(); 
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Get one event
router.get("/:id", async (req, res) => {
    try {
        const event = await Events.findById(req.params.id); 
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




 // Approve event
router.put('/approve/:id', async (req, res) => {
    try {
      const event = await Events.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      event.isApproved = true;
      await event.save();
  
      res.status(200).json({ message: 'Event approved', event });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
 

  // Get approved events
router.get('/', async (req, res) => {
    try {
      const events = await Events.find({ isApproved: true });
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  router.get('/event/approved', async (req, res) => {
    try {
      const approvedEvents = await Event.find({ isApproved: true });
      res.status(200).json(approvedEvents);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching approved events' });
    }
  });
  
  


// Update event
router.put("/update/:id", upload.single('image'), async (req, res) => {
    const eventId = req.params.id;
    const {
        name, category, description, location, date, time, price,
        t1, t2, t3, t4, t5, t6, t7
    } = req.body;
    const image = req.file ? req.file.originalname : req.body.existingImage;

    try {
        const updatedEvent = await Events.findByIdAndUpdate(eventId, {
            name,
            category,
            description,
            location,
            date,
            time,
            price,
            image,
            ticketCriteria: { t1, t2, t3, t4, t5, t6, t7 }
        }, { new: true });

        if (!updatedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.json({ message: "Event updated successfully", updatedEvent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete event
router.delete("/delete/:id", async (req, res) => {
    const eventId = req.params.id;

    try {
        const deleteEvent = await Events.findByIdAndDelete(eventId);

        if (!deleteEvent) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
