const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();
const authRoutes = require('./routes/auth');
const locationRoutes = require('./routes/Location');
<<<<<<< HEAD

const eventsRoutes = require('./routes/Event.js');

=======
const vehicleRoutes = require('./routes/Vehicle');
const packageRoutes = require('./routes/package');
const authuser = require('./routes/authRoutes')
>>>>>>> main
const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL).then(() => {
    console.log("MongoDB database connection established successfully");
}).catch((error) => {
    console.error("Connection error:", error);
});


const server = app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});
app.use('/auth', authRoutes);
app.use('/location',locationRoutes);
<<<<<<< HEAD

app.use('/event',eventsRoutes);
=======
//app.use('/vehicle',vehicleRoutes); 

app.use('/uploads', express.static('uploads'));
app.use('/packages', packageRoutes);
app.use('/userauth',authuser)

>>>>>>> main
