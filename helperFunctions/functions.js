require("dotenv").config();
const axios = require("axios");

const getLocalLonLat = () => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=95814&key=${process.env.GOOGLE_API}`
    )
    .then(({ data }) => {
      const { location } = data.results[0].geometry;
      return location;
    });
};

const getWeatherData = (lat, long) => {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${process.env.WEATHER_KEY}`
    )
    .then(({ data }) => {
      return data;
    });
};

const getZipLonLat = (zipCode) => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${process.env.GOOGLE_API}`
    )
    .then(({ data }) => {
      const { location } = data.results[0].geometry;
      return location;
    })
    .catch((error) => {
      console.error(error);
      return { lat: 38.5816, lng: -121.4944 }; // Default to Sacramento, CA
    });
};

module.exports = { getLocalLonLat, getWeatherData, getZipLonLat };
