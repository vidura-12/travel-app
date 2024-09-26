const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();

// Import routes
const authRoutes = require('./routes/auth');
const middle = require('./middleware/auth');
const locationRoutes = require('./routes/Location');

<<<<<<< HEAD
const app = express();
=======


const eventsRoutes = require('./routes/Event.js');
// const ticketRoutes = require('./routes/tickets');


const vehicleRoutes = require('./routes/Vehicle');
>>>>>>> Final
const packageRoutes = require('./routes/package');
const checklistRoutes = require('./routes/checklist');
const locationAdmin = require('./routes/Locationadmin');
<<<<<<< HEAD
const PORT = process.env.PORT || 8081;
const path = require('path');
 
=======
const auth1 = require('./routes/auth1');
const addRoute = require("./routes/create");
const addRoute1 = require("./routes/feedback");

const app = express();
const PORT = process.env.PORT || 8081;
>>>>>>> Final

// Middleware
app.use(cors());
<<<<<<< HEAD
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


//import routes server
const addRoute = require ("./routes/create"); // this
 
=======
app.use(express.json()); // Use express.json() to parse JSON bodies
>>>>>>> Final

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
app.use('/api/auth', auth1);
app.use('/api/checklists', checklistRoutes);
app.use('/TourGuide', addRoute);
app.use('/auth', authRoutes);
app.use('/location', locationRoutes);
// Uncomment the line below if needed
// app.use('/vehicle', vehicleRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/packages', packageRoutes);
app.use('/locationAdmin', locationAdmin);
app.use('/FeedBack', addRoute1); // Feedback route

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});

app.use('/auth', authRoutes);
app.use('/location',locationRoutes);


app.use('/event',eventsRoutes);
// app.use('/Ticket',ticketRoutes)

//app.use('/vehicle',vehicleRoutes); 

app.use('/uploads', express.static('uploads'));
app.use('/packages', packageRoutes);



app.use('/TourGuide', addRoute);
app.use('/auth', authRoutes);
app.use('/location',locationRoutes);
<<<<<<< HEAD
=======

>>>>>>> Final

app.use('/uploads', express.static('uploads'));
app.use('/packages', packageRoutes);

app.use('/locationAdmin',locationAdmin);

<<<<<<< HEAD


























const vehicleRoutes = require('./routes/vehicleRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const authController = require('./controllers/authController');
const vehicleOwnerController = require('./controllers/VehicleOwnerController');


app.post('/login-vehicle', authController.login);
app.post('/register', authController.register);
app.post('/vehicle-owner/register', vehicleOwnerController.register);
app.post('/vehicle-owner/login', vehicleOwnerController.login);
app.use('/api/vehicles', vehicleRoutes);
app.use('/uploads-vehicle-owner', express.static(path.join(__dirname, 'uploads')));
app.use('/api', bookingRoutes);
=======
>>>>>>> Final
