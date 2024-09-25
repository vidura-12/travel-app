const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const createSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending'  // Default value to 'pending'
    },
    isApproved: {
        type: Boolean,
        default: false  // Default to 'false'
    }
});

module.exports = mongoose.model('Create', createSchema);
