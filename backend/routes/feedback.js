// routes/feedback.js
const mongoose = require("mongoose");
const express = require('express');
const Feedback = require('../models/feedback');

const router = express.Router();

// Save feedback
router.post('/save',async (req, res) => {
    
   const {name , email , feedbackCategory ,comment } = req.body;

   try{
      const newCreate = new Feedback ({
         name , 
         email , 
         feedbackCategory ,
         comment
      });

      await newCreate.save();
      res.json("Succesfull");
   }

    catch(error){
      res.status(400).json({error:error.message});
    }
});

module.exports = router;
