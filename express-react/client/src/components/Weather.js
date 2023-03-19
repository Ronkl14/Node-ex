import React from "react";
import axios from "axios";
import { useState } from "react";

const Weather = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  function changeHandler(e) {
    setLocation(e.target.value);
  }

  async function submitHandler() {
    try {
      const response = await axios.get(`/api/weather?location=${location}`);
      setWeather(response.data.current.temp_c);
      setError(null);
      console.log(weather);
    } catch (error) {
      console.error(error);
      setWeather(null);
      setError("Error fetching weather data. Please try again later.");
    }
  }

  return (
    <div>
      <input
        type="text"
        name="location"
        value={location}
        onChange={changeHandler}
      ></input>
      <button onClick={submitHandler}>SUBMIT</button>
      <p>{weather}</p>
      <p>{error}</p>
    </div>
  );
};

export default Weather;
