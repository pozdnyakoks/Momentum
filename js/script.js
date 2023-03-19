import playlistFunc from './modules/playlistFunc.js'
import { showGreeting, showTime } from './modules/timeAndDate.js';
import { getQuotes } from './modules/quotes.js';
import { setBg, getSlideNext, getSlidePrev } from './modules/imgSource.js'
import { getWeather } from './modules/weather.js';
import { changeLanguage } from './modules/changeLanguage.js';
import { changePicturesSource } from './modules/imgSource.js';
import { getLocalStorage, setLocalStorage } from './modules/localStorage.js';


const next = document.querySelector('.slide-next');
const prev = document.querySelector('.slide-prev');
const tagsChoice = document.querySelector('.tags-choice');
const city = document.querySelector('.city');
const changeButton = document.querySelector('.change-quote');
const selectPict = document.querySelector('.select-pictures');
const settingButton = document.querySelector('.settings-button');
const settingCont = document.querySelector('.setting-container');
const selectLang = document.querySelector('.select-language');

let language = localStorage.language || 'en';

document.body.style.backgroundImage =
  "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/18.jpg')";


playlistFunc();
showTime(language)
setInterval(() => showTime(language), 1000);
setBg(language)
getWeather(language);
getQuotes(language);

next.addEventListener('click', () => getSlideNext(language));
prev.addEventListener('click', () => getSlidePrev(language));

city.addEventListener('change', function () {
  getWeather(language);
});

window.addEventListener('beforeunload', () => setLocalStorage(language));
window.addEventListener('load', () => getLocalStorage(language));


changeButton.addEventListener('click', () => getQuotes(language));

selectLang.addEventListener('change', () => {
  language = selectLang.value.toLowerCase()
  changeLanguage(language)
});

selectPict.addEventListener('change', () => changePicturesSource(language));


settingButton.addEventListener('click', function () {
  settingButton.classList.toggle('active');
  settingCont.classList.toggle('active');
});

document.body.addEventListener('click', function (e) {
  const target = e.target;
  const targetSet = target == settingCont || settingCont.contains(target);
  const targetBtn = target == settingButton;
  const activeSet = settingCont.classList.contains('active');
  if (!targetSet && !targetBtn && activeSet) {
    settingButton.classList.remove('active');
    settingCont.classList.remove('active');
  }
});

const dayPart = showGreeting(selectLang.value.toLowerCase());
tagsChoice.value = `${dayPart}`;


