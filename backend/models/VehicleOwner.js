const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const vehicleOwnerSchema = new mongoose.Schema({

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
    }  // Default role for vehicle owners
  });
  
const VehicleOwner = mongoose.model('VehicleOwner', vehicleOwnerSchema);

module.exports = VehicleOwner;