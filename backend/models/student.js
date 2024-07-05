const mongoose = require('mongoose');

const schema = mongoose.Schema;

const studentSchema = new schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true

    }
});

const student = mongoose.model("Student",studentSchema);

module.exports = student;