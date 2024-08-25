const express = require("express");
const router = express.Router();
const multer = require('multer');
const { Events, upload } = require('../models/Event'); 



router.post('/add', upload.single('image'), async (req, res) => {
    const name = req.body.name;
    const category = req.body.category;
    const description = req.body.description; // updated to match frontend
    const location = req.body.location; // updated to match frontend
    const date = req.body.date;
    const time = req.body.time;
    const price = Number(req.body.price);
    const image = req.file ? req.file.originalname : null;

    try {
        const newEvent = new Events({
            name,
            category,
            description, // updated to match frontend
            location, // updated to match frontend
            date,
            time,
            price,
            image
        });

        await newEvent.save();

        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get("/", async (req, res) => {
    try {
        const events = await Events.find(); 
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




//get one event
router.get("/:id",async(req, res)=>{
    try {
        const events = await Events.findById(req.params.id); 
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


//update events
//http://localhost:8081/event/update

router.put("/update/:id", upload.single('image'), async(req,res) =>{
    const eventId = req.params.id;

    const updatedData = {
        name: req.body.name,
        category: req.body.category,
        details: req.body.details,
        venue: req.body.venue,
        date: req.body.date,
        time: req.body.time,
        price: Number(req.body.price),
        image: req.file ? req.file.originalname : req.body.existingImage,
    };

    try {
        const updatedEvent = await Events.findByIdAndUpdate(eventId, updatedData,);

        if(!updatedEvent){
            return res.status(404).json({ error: "Event not found" });
        }

        res.json({message: "Event updated successfully", updatedEvent})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})



//Delete event
//http://localhost:8081/event/delete

router.delete ("/delete/:id", async(req,res)=>{
    const eventId = req.params.id;

    try {
        const deleteEvent = await Events.findByIdAndDelete(eventId);

        if(!deleteEvent){
            return res.status(404).json({ error: "Event not found" });
        }

    res.json({message:"Event deleted successfully"});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;