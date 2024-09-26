const express = require("express");
const router = express.Router();
<<<<<<< HEAD
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
=======
const { Events, upload } = require('../models/Event');
const nodemailer = require('nodemailer');

>>>>>>> Final

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

<<<<<<< HEAD


//Get all Events
//http://localhost:8081/event/

=======


//Add ticket details
router.post('/:id/tickets', async (req, res) => {
    const { tname,tcategory, phone, email, noOfTicket, otherFields } = req.body;

    try {
        // Find the event by ID
        const event = await Events.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Create a new user ticket object
        const newTicket = {
            tname: tname,
            tcategory:tcategory,
            phone: phone,
            email: email,
            noOfTicket: noOfTicket,
            otherFields: otherFields // Dynamic fields passed as a Map or object
        };

        // Add the new ticket to the event's userTickets array
        event.userTickets.push(newTicket);

        // Save the updated event document
        await event.save();

        // Respond with the updated event
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
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
<<<<<<< HEAD
})
=======
});


//book ticket
router.get('/tickets', async (req, res) => {
  try {
    const events = await Events.find({}, 'name category userTickets price'); // Fetch events with relevant fields

    const formattedTickets = events.flatMap(event => 
      event.userTickets.map(ticket => ({
        tname: ticket.tname,
        phone: ticket.phone,
        email: ticket.email,
        noOfTicket: ticket.noOfTicket,
        category: event.category, // Getting category from the event
        totalPrice: ticket.noOfTicket * event.price // Assuming each ticket has a price
      }))
    );

    res.json(formattedTickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

>>>>>>> Final


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

<<<<<<< HEAD
module.exports = router;
=======

// send a email--------------------------------------------------------

router.post('/:eventId/tickets', async (req, res) => {
    const { tname, tcategory, phone, email, noOfTicket, totalPrice, otherFields } = req.body;
  
    try {
      // Set up nodemailer transporter (using Gmail in this example)
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'youremail@gmail.com', // Your email
          pass: 'yourpassword' // Your email password (use environment variables for security)
        }
      });
  
      // Compose the email content
      const mailOptions = {
        from: 'youremail@gmail.com',
        to: email,
        subject: `Your Ticket for ${tname}`,
        text: `Dear customer,
  
        Thank you for booking tickets for the event "${tname}" (${tcategory}).
        Here are your ticket details:
        
        - Name: ${tname}
        - Category: ${tcategory}
        - Phone: ${phone}
        - Email: ${email}
        - Number of Tickets: ${noOfTicket}
        - Total Price: $${totalPrice}
  
        Additional Information: ${Object.entries(otherFields).map(([key, value]) => `\n- ${key}: ${value}`)}
  
        We look forward to seeing you at the event.
  
        Regards,
        Event Management Team`
      };
  
      // Send the email
      let info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
  
      res.status(200).json({ message: 'Ticket submitted successfully and email sent.' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error submitting ticket and sending email.' });
    }
  });



module.exports = router;
>>>>>>> Final
