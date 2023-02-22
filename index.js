const express = require("express");
const cors = require("cors");
const {
  getLocalLonLat,
  getWeatherData,
  getZipLonLat,
} = require("./helperFunctions/functions");

require("dotenv").config();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  try {
    getLocalLonLat().then((response) => {
      const { lat, lng } = response;
      getWeatherData(lat, lng).then((response) => {
        const { weather, main, wind, clouds, name, sys } = response;

        const weatherData = {
          weather,
          main,
          wind,
          clouds,
          name,
          sys,
        };
        res.status(200).json(weatherData);
      });
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.get("/zipcode", (req, res) => {
  try {
    const zipCode = req.query.zip;
    getZipLonLat(zipCode).then((response) => {
      const { lat, lng } = response;

      getWeatherData(lat, lng).then((response) => {
        const { weather, main, wind, clouds, name, sys } = response;

        const weatherData = {
          weather,
          main,
          wind,
          clouds,
          name,
          sys,
        };
        console.log(weatherData);
        res.status(200).json(weatherData);
      });
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.listen(3001, () => {
  console.log("Server is running on localhost3001");
});
