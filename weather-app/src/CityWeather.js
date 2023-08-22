import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [message, setMessage] = useState("");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");

  function displayTemperature(response) {
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function OnSubmit(event) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b40b135798f82a05aed08769f9275f50&units=metric`;
    axios.get(url).then(displayTemperature);
    event.preventDefault();

    if (weather) {
      setMessage(
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {Math.round(weather.wind)}km/h</li>
          <li>
            <img src={weather.icon} alt="{weather.description}" />
          </li>
        </ul>
      );
    } else {
      return "unknown";
    }
  }

  function ChangeCity(event) {
    setCity(event.target.value);
  }

  return (
    <div>
      <form onSubmit={OnSubmit}>
        <input
          type="input"
          placeholder="Enter a city..."
          onChange={ChangeCity}
        />
        <input type="submit" value="Search" />
      </form>
      <h3>{message}</h3>
    </div>
  );
}
