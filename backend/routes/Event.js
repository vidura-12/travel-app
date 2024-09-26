const express = require("express");
const router = express.Router();
const multer = require('multer');
const Events = require("../models/Event"); // Correct model import

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 } // 10 MB limit
});




// Create a new event
// http://localhost:8081/event/add

router.post('/add', upload.single('image'), async (req, res) => {
    const name = req.body.name;
    const category = req.body.category;
    const details = req.body.details;
    const venue = req.body.venue;
    const date = req.body.date;
    const time = req.body.time;
    const price = Number(req.body.price);
    const image = req.file ? req.file.originalname : null;

    try {
        // Ensure that we are using the correct variable name consistently
        const newEvent = new Events({
            name,
            category,
            details,
            venue,
            date,
            time,
            price,
            image
        });

        // Save the new event
        await newEvent.save();

        res.json("Event added successfully");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


//add ticket details
router.post('/event/:id/tickets', async (req, res) => {
  const { id } = req.params;
  const { tname, tcategory, phone, email, noOfTicket, totalPrice, otherFields } = req.body;

<<<<<<< HEAD
//Get all Events
//http://localhost:8081/event/

=======
  try {
    // Find the event by its ID
    const event = await Events.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Add the new ticket details to the userTickets array
    event.userTickets.push({
      tname,
      phone,
      email,
      noOfTicket,
      totalPrice,
      tcategory,
      ...otherFields // Spread additional fields here
    });

    // Save the updated event
    await event.save();

    res.status(201).json({ message: 'Ticket added successfully' });
  } catch (error) {
    console.error('Error adding ticket:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



  

// Get all events
>>>>>>> Final
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


<<<<<<< HEAD
//update events
//http://localhost:8081/event/update

router.put("/update/:id", upload.single('image'), async(req,res) =>{
=======

//get ticket booking etails
router.get('/tickets', async (req, res) => {
  try {
      const events = await Events.find({ "userTickets.0": { $exists: true } });
      const tickets = events.flatMap(event => event.userTickets.map(ticket => ({
          tname: ticket.tname,
          tcategory: ticket.tcategory,
          phone: ticket.phone,
          email: ticket.email,
          noOfTicket: ticket.noOfTicket,
          totalPrice: ticket.totalPrice
      })));

      console.log("Fetched tickets:", tickets);  // Add this line for debugging
      res.status(200).json(tickets);
  } catch (error) {
      console.error('Error retrieving tickets:', error);  // Add error logging
      res.status(500).json({ error: 'Error retrieving tickets' });
  }
});






 //--------------------------------------------------

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
  


// Update event
router.put("/update/:id", upload.single('image'), async (req, res) => {
>>>>>>> Final
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