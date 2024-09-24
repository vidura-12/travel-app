const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    employeeID: {
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    position:{
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: Number,
        required: true,
    },
    nic:{
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    }
})

const Employee = mongoose.model("employee",EmployeeSchema);

module.exports = Employee;
