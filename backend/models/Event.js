const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({

    name :{
        type: String,
        required : true
    },

    category:{
        type: String,
        required: true
    },

    details:{
        type: String,
        required: true
    },

    venue:{
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    time: {
        type: String,
        required: true 
    },

    price:{
        type: Number,
        required: true
    },

    image: {
        type: String,
    }
});

const Events = mongoose.model("events",eventSchema);

module.exports = Events;
