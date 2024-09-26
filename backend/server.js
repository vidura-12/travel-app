require('dotenv').config();
const mongoose = require("mongoose");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authController = require('./controllers/authController');
const vehicleOwnerController = require('./controllers/VehicleOwnerController');
const vehicleRoutes = require('./routes/vehicleRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());

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

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/vehicles', vehicleRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', bookingRoutes);


app.post('/login', authController.login);
app.post('/register', authController.register);


app.post('/vehicle-owner/register', vehicleOwnerController.register);
app.post('/vehicle-owner/login', vehicleOwnerController.login);

