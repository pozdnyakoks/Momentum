
import { greetingTranslation } from './translation.js'

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const error = document.querySelector('.weather-error');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

export async function getWeather(language) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${language}&appid=f7a5bb3ea6bb02ada24c582c49e31962&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === '404' || data.cod === '400') {
    temperature.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
    weatherDescription.textContent = '';
    weatherIcon.className = '';
    error.textContent = greetingTranslation[language][4];
  } else {
    error.textContent = '';
    weatherIcon.classList.add('weather-icon');
    weatherIcon.classList.add('owf');
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    wind.textContent = `${greetingTranslation[language][5]} ${Math.round(data.wind.speed)} ${greetingTranslation[language][6]}`;
    humidity.textContent = `${greetingTranslation[language][7]} ${Math.round(data.main.humidity)}%`;
    weatherDescription.textContent = data.weather[0].description;
  }
}

