const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packageSchema = new Schema({
  agencyName: { 
    type: String, 
    required: true 
},
  phoneNumber: { 
    type: String, 
    required: true 
},
  email: { 
    type: String, required: true 
},
  location: { 
    type: String, required: true 
},
  places: { 
    type: [String], required: true 
},
  maxPeople: { 
    type: Number, required: true 
},
  price: { 
    type: Number, required: true 
},
  image: { 
    type: String, required: true 
},
});

module.exports = mongoose.model('Package', packageSchema);
