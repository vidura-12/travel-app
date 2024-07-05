const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

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
