const mongoose = require('mongoose');
const { Schema } = mongoose;

const sellerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/, // Basic email validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum password length
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Travel Agency', 'Event Manager', 'Vehicle Owner', 'Hotel Owner'], // Define roles here
    default: 'Travel Agency', // Update default role if necessary
  },
}, { timestamps: true });

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
