const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();
const authRoutes = require('./routes/auth');
const middle = require('./middleware/auth')
const locationRoutes = require('./routes/Location');
const vehicleRoutes = require('./routes/vehicleRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const authController = require('./controllers/authController');
const vehicleOwnerController = require('./controllers/VehicleOwnerController');
const app = express();
const packageRoutes = require('./routes/package');
const authuser = require('./routes/authRoutes')
const locationAdmin = require('./routes/Locationadmin');
const PORT = process.env.PORT || 8081;
const path = require('path');
 

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


//import routes server
const addRoute = require ("./routes/create"); // this
 

const URL = process.env.MONGODB_URL;

mongoose.connect(URL).then(() => {
    console.log("MongoDB database connection established successfully");
}).catch((error) => {
    console.error("Connection error:", error);
});


const server = app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});


app.use('/TourGuide', addRoute);
app.use('/auth', authRoutes);
app.use('/location',locationRoutes);

app.use('/uploads', express.static('uploads'));
app.use('/packages', packageRoutes);
app.use('/userauth',authuser);
app.use('/locationAdmin',locationAdmin);

app.post('/login-vehicle', authController.login);
app.post('/register', authController.register);

app.post('/vehicle-owner/register', vehicleOwnerController.register);
app.post('/vehicle-owner/login', vehicleOwnerController.login);
app.use('/api/vehicles', vehicleRoutes);
app.use('/uploads-vehicle-owner', express.static(path.join(__dirname, 'uploads')));
app.use('/api', bookingRoutes);