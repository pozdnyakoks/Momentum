import { days, greetingTranslation } from './translation.js'

const dateBlock = document.querySelector('.date');
const time = document.querySelector('.time');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const date = new Date();

export function showDate(language) {
  const weekDay = days[language][date.getDay()];
  const options = { month: 'long', day: 'numeric', timeZone: 'UTC' };
  const lang = `${language}-${language.toUpperCase()}`
  const currentDate = `${weekDay}, ${date.toLocaleDateString(lang, options)}`;
  dateBlock.textContent = currentDate;
  name.placeholder = greetingTranslation[language][8];
}

function getTimeOfDay(hours, lang) {
  if (hours > 5 && hours < 12) {
    greeting.textContent = lang[0];
    return 'morning';
  } else if (hours > 11 && hours < 18) {
    greeting.textContent = lang[1];
    return 'afternoon';
  } else if (hours > 17 && hours < 24) {
    greeting.textContent = lang[2];
    return 'evening';
  } else if (hours >= 0 && hours < 6) {
    greeting.textContent = lang[3];
    return 'night';
  }
}

export function showGreeting(language) {
  const date = new Date();
  const hours = date.getHours();
  const timeOfDay = getTimeOfDay(hours, greetingTranslation[language]);
  return timeOfDay;
}

export function showTime(language) {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  showDate(language);
  showGreeting(language);
}








