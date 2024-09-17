const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const vehicleOwnerSchema = new mongoose.Schema({
    // Owner's name
    name: {
        type: String,
        required: true,
    },
    // Owner's age
    age: {
        type: Number,
        required: true,
    },
    // Owner's email address
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    // Owner's username
    username: {
        type: String,
        required: true,
    },
    // Owner's password
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    // Owner's phone number
    phoneNumber: {
        type: String,
        required: true,
        minlength: 10,
    },
    // Owner's address
    address: {
        type: String,
        required: true,
    },
    });

// Hash password before saving the user document
vehicleOwnerSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});

// Compare passwords for login
vehicleOwnerSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};


const VehicleOwner = mongoose.model("VehicleOwner", vehicleOwnerSchema);

module.exports = VehicleOwner;