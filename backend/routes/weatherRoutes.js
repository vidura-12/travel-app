const express = require('express');
const axios = require('axios');
const router = express.Router();

const WEATHER_API_KEY = process.env.WEATHER_API_KEY; // Add your weather API key to .env

// Route to get weather data
router.get('/weather/:location', async (req, res) => {
    const { location } = req.params;
    console.log("Weather API Key: ", WEATHER_API_KEY);
    console.log(`Fetching weather for: ${location}`);


    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            
            params: {
                q: location,
                appid: WEATHER_API_KEY,
                units: 'metric', // or 'imperial'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching weather data' });
    }
});

module.exports = router;
