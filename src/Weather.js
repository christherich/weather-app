import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

function Weather() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=855fd0b8c48a473795e798347cb945f6&units=metric`
      );
      setWeather(response.data);
      setQuery("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="Weather">
      <h2>Weather App</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Enter a city name..."
        />
        <button type="submit">Search</button>
      </form>
      {weather && (
        <div className="Weather-result">
          <h3>
            {weather.name}, {weather.sys.country}
          </h3>
          <p>{Math.round(weather.main.temp)}°C</p>
          <p>
            Feels like {Math.round(weather.main.feels_like)}°C.{" "}
            {weather.weather[0].description}.
          </p>
        </div>
      )}
    </div>
  );
        

}

export default Weather;
