const mongoose = require('mongoose');
const path = require('path');

const ticketSchema = new mongoose.Schema({
    tname: {
        type: String,
        required: true
    },
    tcategory: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z\s]+$/.test(v);  // Only allow letters (a-z, A-Z)
            },
            message: props => `${props.value} is not a valid name! Only letters are allowed.`
        }
    },
    phone: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return /^[0-9]+$/.test(v);  // Only allow numbers
            },
            message: props => `${props.value} is not a valid phone number! Only digits are allowed.`
        }
    },
    email: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    noOfTicket: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return v > 0;  // Only allow positive numbers
            },
            message: props => `${props.value} is not a valid number! Only positive decimal numbers are allowed.`
        }
    },
    total: {
        type: Number,
        required: true
    }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
