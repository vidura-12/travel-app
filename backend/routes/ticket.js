const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');


const Ticket = require('../models/ticket');  // Import Ticket model

router.post('/create', async (req, res) => {
    try {
        const { tname, tcategory, username, phone, email, price, noOfTicket, total } = req.body;

        if (!tname || !tcategory || !username || !phone || !email || !price || !noOfTicket || !total) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        if (!/^[a-zA-Z\s]+$/.test(username)) {
            return res.status(400).json({ message: 'Username should contain only letters.' });
        }

        if (!/^[0-9]+$/.test(phone)) {
            return res.status(400).json({ message: 'Phone number should contain only digits.' });
        }

        if (noOfTicket <= 0) {
            return res.status(400).json({ message: 'No. of tickets should be a positive number.' });
        }

        const newTicket = new Ticket({
            tname,
            tcategory,
            username,
            phone,
            email,
            price,
            noOfTicket,
            total
        });

        const savedTicket = await newTicket.save();
        res.status(201).json(savedTicket);
    } catch (error) {
        console.error('Error creating ticket:', error);  // Log the full error
        res.status(500).json({ message: 'Error creating ticket', error });
    }
});



// Get all tickets (read)
router.get('/tickets', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tickets', error });
    }
});

// Get ticket by ID
router.get('/tickets/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching ticket', error });
    }
});


//Delete 
router.delete('/tickets/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting ticket', error });
    }
});



module.exports = router;
