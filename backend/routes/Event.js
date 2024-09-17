const express = require("express");
const router = express.Router();
const multer = require('multer');
const { Events, upload } = require('../models/Event'); 



router.post('/add', upload.single('image'), async (req, res) => {
    const name = req.body.name;
    const category = req.body.category;
    const description = req.body.description; 
    const location = req.body.location; 
    const date = req.body.date;
    const time = req.body.time;
    const price = Number(req.body.price);
    const image = req.file ? req.file.originalname : null;

    const t1 = req.body.t1;
    const t2 = req.body.t2;
    const t3 = req.body.t3;
    const t4 = req.body.t4;
    const t5 = req.body.t5;
    const t6 = req.body.t6;
    const t7 = req.body.t7; 

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
            ticketCriteria: {t1,t2,t3,t4,t5,t6,t7}
        });

        await newEvent.save();

        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


//add user ticket details
router.post('/:id/tickets', async (req, res) => {
    const { tname, phone, email, otherFields } = req.body; // otherFields is a key-value pair for dynamic fields

    try {
        const event = await Events.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Add ticket details under the event
        event.userTickets.push({ tname, phone, email, otherFields });
        await event.save();

        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});




//Get all details
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
        description:req.body.description,
        details: req.body.details,
        venue: req.body.venue,
        date: req.body.date,
        location: req.body.location,
        time: req.body.time,
        price: Number(req.body.price),
        image: req.file ? req.file.originalname : req.body.existingImage,

         t1: req.body.t1,
         t2: req.body.t2,
         t3: req.body.t3,
         t4: req.body.t4,
         t5: req.body.t5,
         t6: req.body.t6,
         t7: req.body.t7, 
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