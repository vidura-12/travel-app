const express = require("express");
const Create = require("../models/create"); // Import your tour guide model
const bcrypt = require('bcrypt');


const router = express.Router();

// Create Route (Add a Tour Guide)
router.post('/add', async (req, res) => {
    const { name, email, address, number, experience, language, username, password } = req.body;

    try {
        // Define the hashed password before creating the new guide
        const hashedPassword = await bcrypt.hash(password, 10);

        const newCreate = new Create({
            name,
            email,
            address,
            number,
            experience,
            language,
            username,
            password, // Use the hashed password
            role: 'Tour Guide',
            status: 'pending',
            isApproved: false
        });

        await newCreate.save();
        res.json("Tour Guide Added Successfully");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Get All Tour Guides Route
router.get('/all', async (req, res) => {
    try {
        const allGuides = await Create.find({ role: 'Tour Guide' }); // Filter by role
        res.json(allGuides);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get one 
router.get("/:id", async (req, res) => {
    try {
        const guide = await Create.findById(req.params.id); 
        if (!guide) {
            return res.status(404).json({ error: 'guide not found' });
        }
        res.json(guide);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Tour Guide Route
router.put('/update/:id', async (req, res) => {
    const { name, email, address, number, experience, language } = req.body;

    try {
        const updatedGuide = await Create.findByIdAndUpdate(
            req.params.id,
            { name, email, address, number, experience, language },
            { new: true } // Return the updated document
        );

        if (!updatedGuide) {
            return res.status(404).json({ error: "Tour Guide not found" });
        }

        res.json("Tour Guide Updated Successfully");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
 

// Approve Tour Guide Route
router.put('/approve/:id', async (req, res) => {
    try {
        const guide = await Create.findById(req.params.id);

        if (!guide) {
            return res.status(404).json({ error: "Tour Guide not found" });
        }

        guide.isApproved = true; // Mark as approved
        guide.status = 'approved';

        await guide.save();
        res.json("Tour Guide Approved");

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Deny (Delete) Tour Guide Route
router.delete('/delete/:id', async (req, res) => {
    try {
        const guide = await Create.findByIdAndDelete(req.params.id);

        if (!guide) {
            return res.status(404).json({ error: "Tour Guide not found" });
        }

        res.json("Tour Guide Denied and Deleted Successfully");

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Approved Tour Guides Route
router.get('/approved', async (req, res) => {
    try {
        const approvedGuides = await Create.find({ isApproved: true, role: 'Tour Guide' }); // Filter by role
        res.json(approvedGuides);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
         
        const user = await Create.findOne({ email });

        if (!user) {
            return res.json({ error: "User not found" });
        }

         if(user.password == password){
            return res.json({status: "ok"});
         }
         else{
            return res.json({err: "Incorrect password"});
         }
         

    } catch (error) {
        console.error(err);
        res.status(500).jso({err: "Server Err"})
    }
});
 
module.exports = router;
 
