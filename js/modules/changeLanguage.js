
import { getWeather } from "./weather.js";
import { showGreeting } from "./timeAndDate.js";
import { getQuotes } from "./quotes.js";
import { optionTranslation, settingTranslation, greetingTranslation } from "./translation.js";

const langPar = document.querySelector('.language');
const pictSource = document.querySelector('.pictures');
const pictTags = document.querySelector('.tags');
const blocks = document.querySelector('.blocks');
const name = document.querySelector('.name');
const checkboxLabel = document.querySelectorAll('.checkbox-label');

export function changeLanguage(language) {

  getWeather(language);
  showGreeting(language)
  getQuotes(language);

  langPar.textContent = settingTranslation[language][0];
  pictSource.textContent = settingTranslation[language][1];
  pictTags.textContent = settingTranslation[language][2];
  blocks.textContent = settingTranslation[language][3];
  name.placeholder = greetingTranslation[language][8];
  for (let i = 0; i < checkboxLabel.length; i++) {
    checkboxLabel[i].textContent = optionTranslation[language][i];
  }
}