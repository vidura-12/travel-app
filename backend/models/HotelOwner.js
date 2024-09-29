const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const hotelOwnerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
        phone: {
            type: String,
            required: [true, 'Please add a phone number'],
        },
        hotels: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Hotel',
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Encrypt password before saving
hotelOwnerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to match entered password to hashed password
hotelOwnerSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const HotelOwner = mongoose.model('HotelOwner', hotelOwnerSchema);

module.exports = HotelOwner;
