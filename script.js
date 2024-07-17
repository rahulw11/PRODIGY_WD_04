const apiKey = 'b85a94362c97f2f0cf774af82e92072e'; // Replace with your OpenWeatherMap API key

const cityInput = document.getElementById('city');
const searchButton = document.getElementById('search-btn'); // Use a button ID that matches the HTML
const currentWeatherDiv = document.getElementById('temp-div'); // Corrected element ID
const weatherInfoDiv = document.getElementById('weather-info'); // Corrected element ID
const hourlyForecastDiv = document.getElementById('hourly-forecast');

searchButton.addEventListener('click', getWeather);

function getWeather() {
  const city = cityInput.value.trim();

  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const hourlyForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(displayCurrentWeather)
    .catch(error => {
      console.error('Error fetching current weather:', error);
      alert('Error fetching weather data. Please try again.');
    });

  fetch(hourlyForecastUrl)
    .then(response => response.json())
    .then(data => displayHourlyForecast(data.list))
    .catch(error => {
      console.error('Error fetching hourly forecast:', error);
      alert('Error fetching forecast data. Please try again.');
    });
}

function displayCurrentWeather(data) {
  currentWeatherDiv.innerHTML = ''; // Clear previous content

  if (data.cod === '404') {
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`; // Corrected element for error message
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const temperatureHTML = `<p>${temperature}°C</p>`;
    const weatherHTML = `<p>${cityName}</p><p>${description}</p><img src="${iconUrl}" alt="Weather Icon" id="weather-icon">`;

    currentWeatherDiv.innerHTML = temperatureHTML;
    weatherInfoDiv.innerHTML = weatherHTML; // Corrected element for weather info
  }
}

function displayHourlyForecast(hourlyData) {
  hourlyForecastDiv.innerHTML = ''; // Clear previous content

  const next24Hours = hourlyData.slice(0, 8);

  next24Hours.forEach(item => {
    const dateTime = new Date(item.dt * 1000);
    const hour = dateTime.getHours();
    const temperature = Math.round(item.main.temp - 273.15);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyItemHtml = `<div class="hourly-item"><span>${hour}:00</span><img src="${iconUrl}" alt="Hourly Weather Icon"><span>${temperature}°C</span></div>`;
    hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}

function showImage(){
  const weatherIcon = document.getElementById('weather-icon');
  weatherIcon.style.display = 'block';
}
