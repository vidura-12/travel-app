const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const vehicleOwnerSchema = new mongoose.Schema({

    fullName: {    
        type: String, 
        required: true 
    },

    phoneno: {
        type: String,
        required: true
    },
    
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },

    email: { 
        type: String, 
        required: true, 
        unique: true 
    },

    password: { 
        type: String, 
        required: true 
    },

    role: { 
        type: String, 
        default: 'vehicle-owner' 
    }, // Default role for vehicle owners
    location: {
        type: String,
        required: false  
    },
    vehicles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle', // Reference to the Vehicle model
    }],
  });
  
const VehicleOwner = mongoose.model('VehicleOwner', vehicleOwnerSchema);

module.exports = VehicleOwner;