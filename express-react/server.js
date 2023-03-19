import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config({ path: "./config/config.env" });

const app = express();

app.get("/", (req, res) => res.send("Server running"));

app.get("/api/weather", async (req, res) => {
  const { location } = req.query;

  if (!location || location.trim() === "") {
    return res.status(400).send("Invalid or missing location parameter");
  }

  const options = {
    method: "GET",
    url: process.env.WEATHER_API_URL,
    params: { key: process.env.API_KEY, q: location },
  };

  try {
    const response = await axios.request(options);
    const weatherData = response.data;
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching weather data");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV}
mode on port ${PORT}`)
);
