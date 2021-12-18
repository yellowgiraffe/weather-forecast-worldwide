import Location from './Location.js';
import { WEATHER_API_KEY } from "../apikeys.js";
const weatherUnits = 'metric'

export default class Weather {
  constructor() {
    this.location = new Location();
  }

  getUserLocation() {
    this.location.get()
      .then((coords) => {
        const latitude = coords.latitude;
        const longitude = coords.longitude;
        this.getWeatherData(latitude, longitude);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getWeatherData(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${WEATHER_API_KEY}&units=${weatherUnits}`;

    fetch(url)
      .then((weatherData) => {
        return weatherData.json();
      })
      .then((weatherJson) => {
        this.displayTodayWeather(weatherJson);
        this.displayForecast(weatherJson);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  displayTodayWeather(weather) {
    const currentTemperature = weather.current.temp;
    const currentTemperatureEl = document.querySelector('.weather__temperature');
    currentTemperatureEl.textContent = currentTemperature.toFixed(0) + '°C';

    const weatherCode = weather.current.weather[0].icon;
    const weatherIcon = document.querySelector('.weather__icon')
    const iconUrl = `styles/img/weather-icons/${weatherCode}.svg`;
    weatherIcon.src = iconUrl;

    const weatherDesc = weather.current.weather[0].description; 
    const currentWeatherEl = document.querySelector('.current-weather');
    currentWeatherEl.textContent = weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1);

    const feelsLike = weather.current.feels_like;
    const feelsLikeEl = document.querySelector('.feels-like');
    feelsLikeEl.textContent = feelsLike.toFixed(0) + '°C';

    const wind = weather.current.wind_speed;
    const windEl = document.querySelector('.wind');
    windEl.textContent = wind.toFixed(1) + ' m/s';

    const humidity = weather.current.humidity;
    const humidityEl = document.querySelector('.humidity');
    humidityEl.textContent = humidity + ' %';

    const timezone = weather.timezone;
    const time = new Date(weather.current.dt * 1000);
    const dateEl = document.querySelector('.weather__current-date');
    const timeEl = document.querySelector('.weather__current-time');
    dateEl.textContent = time.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', timeZone: `${timezone}`});
    timeEl.textContent = time.toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit', timeZone: `${timezone}`});
  }

  displayForecast(weather) {
    const weatherUnit = '°C';
    const timezone = weather.timezone;

    const forecastDay1Date = new Date(weather.daily[1].dt * 1000);
    const forecastDay1El = document.querySelector('.weather-day1');
    forecastDay1El.textContent = forecastDay1Date.toLocaleDateString('en-GB', { weekday: 'long', timeZone: `${timezone}`});

    const forecastDay1Temp = weather.daily[1].temp.day;
    const forecastDay1TempEl = document.querySelector('.weather-day1__temp');
    forecastDay1TempEl.textContent = forecastDay1Temp.toFixed(0) + weatherUnit;
    
    const forecastDay1WeatherCode = weather.daily[1].weather[0].icon;
    const forecastDay1IconEl = document.querySelector('.weather-day1__icon');
    forecastDay1IconEl.src = `styles/img/weather-icons/${forecastDay1WeatherCode}.svg`;

    const forecastDay2Date = new Date(weather.daily[2].dt * 1000);
    const forecastDay2El = document.querySelector('.weather-day2');
    forecastDay2El.textContent = forecastDay2Date.toLocaleDateString('en-GB', { weekday: 'long', timeZone: `${timezone}`});

    const forecastDay2Temp = weather.daily[2].temp.day;
    const forecastDay2TempEl = document.querySelector('.weather-day2__temp');
    forecastDay2TempEl.textContent = forecastDay2Temp.toFixed(0) + weatherUnit;

    const forecastDay2WeatherCode = weather.daily[2].weather[0].icon;
    const forecastDay2IconEl = document.querySelector('.weather-day2__icon');
    forecastDay2IconEl.src = `styles/img/weather-icons/${forecastDay2WeatherCode}.svg`;

    const forecastDay3Date = new Date(weather.daily[3].dt * 1000);
    const forecastDay3El = document.querySelector('.weather-day3');
    forecastDay3El.textContent = forecastDay3Date.toLocaleDateString('en-GB', { weekday: 'long', timeZone: `${timezone}`});

    const forecastDay3Temp = weather.daily[3].temp.day;
    const forecastDay3TempEl = document.querySelector('.weather-day3__temp');
    forecastDay3TempEl.textContent = forecastDay3Temp.toFixed(0) + weatherUnit;

    const forecastDay3WeatherCode = weather.daily[3].weather[0].icon;
    const forecastDay3IconEl = document.querySelector('.weather-day3__icon');
    forecastDay3IconEl.src = `styles/img/weather-icons/${forecastDay3WeatherCode}.svg`;
  }
}