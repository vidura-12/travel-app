const express = require("express");
const Create = require("../models/create"); // Ensure this model exists
 

const router = express.Router();

// Create Route
router.post('/add', async (req, res) => {
    const { name, email, address, number, experience, language , username , password } = req.body;

    try {
        const newCreate = new Create({
            name,
            email,
            address,
            number,
            experience,
            language ,
            username ,
            password
        });

        await newCreate.save();
        res.json("Tour Guide Added Successfully");

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



// Retrieve All Tour Guides
router.get("/all", async (req, res) => {
    try {
        const tourGuides = await Create.find(); // Retrieve all tour guides
        res.json(tourGuides);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Retrieve a Single Tour Guide by ID
router.get("/:id", async(req,res) =>{
    try{
        const tourGuide = await Create.findById(req.params.id);
        res.json(tourGuide);
        }catch(error){
            res.status(500).json({error:error.message})
        }
});

// Update  
router.put("/update/:id",  async (req, res) =>{
    const guideId = req.params.id;

    const updatedData = {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        number: req.body.number,
        experience: req.body.experience,
        language: req.body.language,
        username : req.body.username ,
        password : req.body.password
         
    };

    try {
        const updatedTourGuide = await Create.findByIdAndUpdate(guideId, updatedData, { new: true });

        if(!updatedTourGuide){
            return res.status(404).json({ error: "Guide not found" });
        }

        res.json({message: "Guide details updated successfully", updatedTourGuide})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})



// Delete a Tour Guide by ID
router.delete("/delete/:id", async (req, res) => {
const TourGuideID = req.params.id; console.log('Deleting TourGuide with ID:', TourGuideID); 

    try {
        const deleteTourGuide = await Create.findByIdAndDelete(TourGuideID);

        if (!deleteTourGuide) {
            return res.status(404).json({ error: "Tour guide not found" });
        }

        res.json({ message: "Tour guide deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});  

module.exports = router;
