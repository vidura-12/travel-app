const express = require('express');
const { updateProfile, getProfile } = require('../controllers/profileController'); 

const router = express.Router();


router.put('/', updateProfile);


router.get('/', getProfile); 

module.exports = router;
