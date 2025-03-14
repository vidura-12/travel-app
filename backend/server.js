const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
 
require("dotenv").config();
const path = require('path'); 
// Import routes
const eventsRoutes = require('./routes/Event.js');
const authRoutes = require('./routes/auth');
const locationRoutes = require('./routes/Location');
 cationAdmin = require('./routes/Locationadmin');
 
const ticketRoutes = require('./routes/ticket');
const packageRoutes = require('./routes/package');
const hotelRoutes = require('./routes/hotelRoutes'); // New hotel routes
const hotelOwnerRoutes = require('./routes/hotelOwnerRoutes'); // Import hotel owner routes
const hotelBookingRoutes = require('./routes/hotelBookingRoutes'); // Import hotel booking routes



const locationAdmin = require('./routes/Locationadmin');
const bodyParser = require('body-parser');
const vehicleRoutes = require('./routes/vehicleRoutes');
const vehicleOwnerRoutes = require('./routes/vehicleOwnerRoutes');
const bookingRoutes = require('./routes/bookingRoutes'); 
const addRoute = require("./routes/create");
const addRoute1 = require("./routes/feedback");
const sellerlog = require('./routes/sellerlog');

const app = express();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(cors());
app.use(express.json()); // Use express.json() to parse JSON bodies

// Connect to MongoDB
const MONGODB_URL = process.env.MONGODB_URL;
const connectWithRetry = () => {
    mongoose.connect(MONGODB_URL)
      .then(() => console.log('MongoDB connected successfully'))
      .catch(err => {
        console.error('MongoDB connection error:', err);
        console.error('Retrying connection in 5 seconds...');
        setTimeout(connectWithRetry, 5000);
      });
  };
  
  connectWithRetry();
app.use('/TourGuide', addRoute);
app.use('/auth', authRoutes);
app.use('/location', locationRoutes);
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
app.use('/api/vehicle-owner', vehicleOwnerRoutes);

app.use('/api/hotels', hotelRoutes); // Mount the hotel routes
// Serve static files from the uploads directory (optional, if you want to serve images)
app.use('/hotel-uploads', express.static(path.join(__dirname, 'uploads')));

    // Default Route
app.get('/', (req, res) => {
    res.send('Welcome to the Hotel Management API');
});

// Use the hotel owner routes
app.use('/api/hotelOwners', hotelOwnerRoutes);
// Use the hotel booking routes
app.use('/api/hotelBookings', hotelBookingRoutes);
 
// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});
const checklistRoutes = require('./routes/checklist');
app.use('/api/auth', require('./routes/auth1'));
app.use('/api/checklists', checklistRoutes);
const weatherRoutes = require('./routes/weatherRoutes');
app.use('/apiwe', weatherRoutes); // Add this line to use the new weather routes
app.use('/ticket',ticketRoutes);
