const express = require("express");
const router = express.Router();
const { Events, upload } = require('../models/Event');
const nodemailer = require('nodemailer');


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
