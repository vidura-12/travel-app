const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();
const path = require('path');

// Import routes
const eventsRoutes = require('./routes/Event.js');
const authRoutes = require('./routes/auth');
const middle = require('./middleware/auth');
const locationRoutes = require('./routes/Location');
const packageRoutes = require('./routes/package');

const locationAdmin = require('./routes/Locationadmin');

const addRoute = require("./routes/create");
const addRoute1 = require("./routes/feedback");
const sellerlog = require('./routes/sellerlog');

const bodyParser = require('body-parser');
const vehicleOwnerController = require('./controllers/VehicleOwnerController');
const vehicleRoutes = require('./routes/vehicleRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const app = express();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(cors());
app.use(express.json()); // Use express.json() to parse JSON bodies

// Connect to MongoDB
const URL = process.env.MONGODB_URL;
mongoose.connect(URL)
    .then(() => {
        console.log("MongoDB database connection established successfully");
    })
    .catch((error) => {
        console.error("Connection error:", error);
    });

// Route Definitions
app.use('/TourGuide', addRoute);
app.use('/auth', authRoutes);
app.use('/location', locationRoutes);
// Uncomment the line below if needed
// app.use('/vehicle', vehicleRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/packages', packageRoutes);
app.use('/event', eventsRoutes);
app.use('/locationAdmin', locationAdmin);
app.use('/FeedBack', addRoute1); // Feedback route
app.use('/sellerlog', sellerlog);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/vehicles', vehicleRoutes);
app.use('/uploads-vehicle-owner', express.static(path.join(__dirname, 'uploads')));
app.use('/api', bookingRoutes);

app.post('/vehicle-owner/register', vehicleOwnerController.register);
app.post('/scheduler/sellersignin', vehicleOwnerController.login);

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});
