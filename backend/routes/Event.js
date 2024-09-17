const express = require("express");
const router = express.Router();
const { Events, upload } = require('../models/Event');

// Add event
router.post('/add', upload.single('image'), async (req, res) => {
    const {
        name, category, description, location, date, time, price,
        t1, t2, t3, t4, t5, t6, t7
    } = req.body;
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
            ticketCriteria: { t1, t2, t3, t4, t5, t6, t7 }
        });

        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Add user ticket details
router.post('/:id/tickets', async (req, res) => {
    const {otherFields } = req.body;

    try {
        const event = await Events.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        event.userTickets.push({otherFields });
        await event.save();

        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

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
