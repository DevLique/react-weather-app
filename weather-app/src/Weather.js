import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [message, setMessage] = useState("");
  const [city, setCity] = useState("");

  function displayTemperature(response) {
    let weather = {
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    };
    setMessage(
      <div>
        <div>Temperature: {Math.round(weather.temperature)}°C</div>
        <div>Description: {weather.description}</div>
        <div>Humidity: {weather.humidity}%</div>
        <div>Wind: {Math.round(weather.wind)}km/h</div>
        <div>
          <img src={weather.icon} alt="{weather.description}" />
        </div>
      </div>
    );
  }

  function OnSubmit(event) {
    event.preventDefault();
    let apiUrl = "8ca7dd4e61360b90fb66918853670e48";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiUrl}&units=metric`;
    axios.get(url).then(displayTemperature);
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
