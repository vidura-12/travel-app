const mongoose = require('mongoose');
const path = require('path');

const ticketSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true }, // Reference to Event
  otherFields: { type: Map, of: String } // Store dynamic user fields as a Map
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
