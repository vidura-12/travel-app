const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require("dotenv");
require('dotenv').config();

// Import Routes
const bodyParser = require('body-parser');
const authController = require('./controllers/authController');
const vehicleOwnerController = require('./controllers/VehicleOwnerController');
const vehicleRoutes = require('./routes/vehicleRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const path = require('path');
// Import routes
const authRoutes = require('./routes/auth');
const middle = require('./middleware/auth');
const locationRoutes = require('./routes/Location');
const packageRoutes = require('./routes/package');
const SellersRoutes = require('./routes/Sellers');
const checklistRoutes = require('./routes/checklist');
const locationAdmin = require('./routes/Locationadmin');
const auth1 = require('./routes/auth1');
const addRoute = require("./routes/create");
const addRoute1 = require("./routes/feedback");


const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());


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

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});


// Route Definitions
app.use('/api/auth', auth1);
app.use('/api/checklists', checklistRoutes);
app.use('/TourGuide', addRoute);
app.use('/auth', authRoutes);
app.use('/location', locationRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/packages', packageRoutes);
app.use('/Seller',SellersRoutes);
app.use('/locationAdmin', locationAdmin);
app.use('/FeedBack', addRoute1); // Feedback route
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/vehicles', vehicleRoutes);
app.use('/uploads-vehicle-owner', express.static(path.join(__dirname, 'uploads')));
app.use('/api', bookingRoutes);

app.post('/login', authController.login);
app.post('/register', authController.register);
app.post('/vehicle-owner/register', vehicleOwnerController.register);
app.post('/vehicle-owner/login', vehicleOwnerController.login);
