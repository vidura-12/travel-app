const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();


const authRoutes = require('./routes/auth');
const middle = require('./middleware/auth')
const locationRoutes = require('./routes/Location');
const vehicleRoutes = require('./routes/Vehicle');
const packageRoutes = require('./routes/package');
const authuser = require('./routes/authRoutes')
const locationAdmin = require('./routes/Locationadmin');

const app = express();
const PORT = process.env.PORT || 8081;
 

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


const addRoute1 = require ("./routes/feedback");//this


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
<<<<<<< HEAD


app.use('/FeedBack', addRoute1); // new


app.use('/TourGuide', addRoute); // new
 
app.use('/auth', authRoutes);

app.use('/location',locationRoutes);
//app.use('/vehicle',vehicleRoutes); 

app.use('/uploads', express.static('uploads'));
app.use('/packages', packageRoutes);
app.use('/userauth',authuser);
app.use('/locationAdmin',locationAdmin);

=======
>>>>>>> parent of 6e77a094 (Merge pull request #106 from vidura-12/Nimesha)
