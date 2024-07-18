const router = require ("express").Router();
const express = require("express");
let create = require ("../models/create");

router.route("/add").post((req , res) => {

    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
     
    const number = req.body.number;
    const experience = req.body.experience;
    const language = req.body.language;

    const newCreate = new create({

        name ,
        email,
        address,
        number,
        experience,
        language

    })

    newCreate.save().then(() =>{
        res.json("Details Added")
    }).catch((err) =>{
        console.log(err);
    })


})

router.route("/").get((req,res)=>{

    create.find().then((creates)=>{
        res.json(creates)
    }).catch((err)=>{
        console.log(err)
    })

})

module.exports = router;
