//const router = require ("express").Router();
const express = require("express");
const create = require ("../models/create");

const router = express.Router();

//Create
router.post('/Create/save' ,(req , res) => {

    let newCreate = new create(req.body);

    newCreate.save((err) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Created post successfully"
        });

    });

});

module.exports = router;
