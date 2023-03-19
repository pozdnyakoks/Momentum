import { getWeather } from "./weather.js";
import { changeLanguage } from "./changeLanguage.js";
import { changePicturesSource } from "./imgSource.js";
import { greetingTranslation } from "./translation.js";

const name = document.querySelector('.name');
const city = document.querySelector('.city');
const tagsChoice = document.querySelector('.tags-choice');
const selectLang = document.querySelector('.select-language');
const selectPict = document.querySelector('.select-pictures');
const checkboxes = document.querySelectorAll('.checkbox');
const greetingCont = document.querySelector('.greeting-container');
const footer = document.querySelector('.footer');
const weatherBlock = document.querySelector('.weather');
const player = document.querySelector('.player');
const dateBlock = document.querySelector('.date');
const time = document.querySelector('.time');


let blocksArr = [];
let checked;

export function getLocalStorage(language) {
  if (localStorage.name) {
    name.value = localStorage.name;
  }
  if (localStorage.city) {
    city.value = localStorage.city;
    getWeather(language);
  } else {
    city.value = greetingTranslation[language][9];
    getWeather(language);
  }
  if (localStorage.language) {
    selectLang.value = localStorage.language;
    changeLanguage(language);
  }
  if (localStorage.pictSource) {
    if (localStorage.tag) {
      tagsChoice.value = localStorage.tag;
    }
    selectPict.value = localStorage.pictSource;
    changePicturesSource(language);
  }
}

export function setLocalStorage() {
  localStorage.name = name.value;
  localStorage.city = city.value;
  localStorage.language = selectLang.value.toLowerCase();
  localStorage.pictSource = selectPict.value;
  localStorage.tag = tagsChoice.value;
  localStorage.blocksArr = JSON.stringify(blocksArr);
}

function hideBlocks(value) {
  switch (value) {
    case 'greeting':
      addRemove(greetingCont);
      break;

    case 'time':
      addRemove(time);
      break;

    case 'date':
      addRemove(dateBlock);
      break;

    case 'quote':
      addRemove(footer);
      break;

    case 'weather':
      addRemove(weatherBlock);
      break;

    case 'player':
      addRemove(player);
      break;
  }
}

function addRemove(block) {
  if (!checked) {
    block.classList.add('visible');
  } else {
    block.classList.remove('visible');
  }
}

let localArr = localStorage.blocksArr ? JSON.parse(localStorage.blocksArr) : null;
checkboxes.forEach((el, index) => {
  if (localStorage.blocksArr) {
    el.checked = localArr[index];
    checked = el.checked;

    hideBlocks(el.value);
  }
  blocksArr.push(el.checked);

  el.addEventListener('change', function () {
    checked = el.checked;
    blocksArr[index] = checked;
    hideBlocks(el.value);
  });
});
