const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

// Import the auth routes
const authRoutes = require('./routes/auth'); 

// Express App
const app = express();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB database connection established successfully"))
.catch((error) => console.error("MongoDB connection error:", error));

// API Routes
app.use('/auth', authRoutes);  // Handles signup and login routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
<<<<<<< Updated upstream


const server = app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});
app.use('/auth', authRoutes);
app.use('/location',locationRoutes);
//app.use('/vehicle',vehicleRoutes); 
=======
>>>>>>> Stashed changes
