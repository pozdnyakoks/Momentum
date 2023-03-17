import playList from '../assets/playList.js';

const time = document.querySelector('.time');
const dateBlock = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const next = document.querySelector('.slide-next');
const prev = document.querySelector('.slide-prev');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const city = document.querySelector('.city');
const error = document.querySelector('.weather-error');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');
const changeButton = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

const player = document.querySelector('.player');
const playlistCont = document.querySelector('.play-list');
const prevSong = document.querySelector('.play-prev');
const nextSong = document.querySelector('.play-next');
const play = document.querySelector('.play');

const progressCont = document.querySelector('.progress-container');
const progressBar = document.querySelector('.progress');
const songName = document.querySelector('.song-name');

const curTime = document.querySelector('.current-time');
const endTime = document.querySelector('.end-time');
const checkboxLabel = document.querySelectorAll('.checkbox-label');

const settingButton = document.querySelector('.settings-button');
const settingCont = document.querySelector('.setting-container');
const selectLang = document.querySelector('.select-language');
const selectPict = document.querySelector('.select-pictures');
const tagsChoice = document.querySelector('.tags-choice');
const langPar = document.querySelector('.language');
const pictSource = document.querySelector('.pictures');
const pictTags = document.querySelector('.tags');

const blocks = document.querySelector('.blocks');
const checkboxes = document.querySelectorAll('.checkbox');

const greetingCont = document.querySelector('.greeting-container');
const footer = document.querySelector('.footer');
const weatherBlock = document.querySelector('.weather');

const volume = document.querySelector('.volume');
const volumeCont = document.querySelector('.volume-progress-container');
const volumeProgress = document.querySelector('.volume-progress');

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

playList.forEach((el) => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = el.title;
  playlistCont.append(li);
});
const lis = document.querySelectorAll('.play-item');

const audio = new Audio();
let isPlay = false;
let playNum = 0;
audio.src = playList[playNum].src;
volumeProgress.style.width = Math.trunc(audio.volume * 100) + '%';

function playAudio() {
  if (!isPlay) {
    lis.forEach((el) => {
      el.classList.remove('item-active');
    });
    isPlay = true;
    play.classList.add('pause');
    lis[playNum].classList.add('item-active');
    songName.textContent = playList[playNum].title;
    endTime.textContent = playList[playNum].duration;
    audio.play();
  } else {
    isPlay = false;
    play.classList.remove('pause');
    audio.pause();
  }
}

function playNext() {
  if (playNum < playList.length - 1) {
    playNum += 1;
  } else {
    playNum = 0;
  }
  audio.src = playList[playNum].src;
  isPlay = false;
  playAudio();
}

audio.addEventListener('ended', playNext);

function playPrev() {
  if (playNum === 0) {
    playNum = playList.length - 1;
  } else {
    playNum -= 1;
  }
  audio.src = playList[playNum].src;
  isPlay = false;
  playAudio();
}

lis.forEach((el, index) => {
  el.addEventListener('click', function () {
    if (playNum !== index) {
      playNum = index;
      audio.src = playList[playNum].src;
      isPlay = false;
      playAudio();
    } else {
      playAudio();
    }
  });
});

play.addEventListener('click', playAudio);
prevSong.addEventListener('click', playPrev);
nextSong.addEventListener('click', playNext);

function songProgress(el) {
  const duration = el.srcElement.duration;
  const currentTime = el.srcElement.currentTime;
  const progressPercent = (currentTime / duration) * 100;
  curTime.innerHTML = musicTime(currentTime);
  progressBar.style.width = `${progressPercent}%`;
}

audio.addEventListener('timeupdate', songProgress);

function musicTime(num) {
  let minutes = Math.floor(num / 60);
  let seconds = Math.floor(num % 60);
  if (num < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

function setProgress(el) {
  const width = this.clientWidth;
  const clickX = el.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}
audio.volume = 0.5;
volumeProgress.style.width = Math.trunc(audio.volume * 100) + '%';

function setVolume(el) {
  const width = this.clientWidth;
  const clickX = el.offsetX;
  audio.volume = clickX / width;
  volumeProgress.style.width = Math.trunc(audio.volume * 100) + '%';
  if (audio.volume > 0) {
    volume.classList.remove('volume-mute');
  } else {
    volume.classList.add('volume-mute');
  }
}

volume.addEventListener('mouseover', function () {
  volumeCont.classList.toggle('active');
});

volume.addEventListener('click', function () {
  let count = audio.volume;
  if (volume.classList.contains('volume-mute')) {
    audio.volume = 0.5;
    volume.classList.remove('volume-mute');
    volumeProgress.style.width = Math.trunc(audio.volume * 100) + '%';
  } else {
    audio.volume = 0;
    volume.classList.add('volume-mute');
    volumeProgress.style.width = 0;
  }
});

progressCont.addEventListener('click', setProgress);
volumeCont.addEventListener('click', setVolume);

const date = new Date();

document.body.style.backgroundImage =
  "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/18.jpg')";


function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
}

function showDate() {
  let days = {
    ru: [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ],
    en: [
      'Sunday',
      'Monday',
      'Thursday',
      'Wednesday',
      'Tuesday',
      'Friday',
      'Saturday',
    ],
  };
  let weekDay = days[language][date.getDay()];
  const options = { month: 'long', day: 'numeric', timeZone: 'UTC' };
  const currentDate =
    weekDay +
    ', ' +
    date.toLocaleDateString(`${language}-${language.toUpperCase()}`, options);
  dateBlock.textContent = currentDate;
}

let optionTranslation = {
  en: [
    'Show Greeting',
    'Show Time',
    'Show Date',
    'Show Quote',
    'Show Weather',
    'Show Player',
    'Show Todo list',
  ],
  ru: [
    'Показать приветствие',
    'Показать время',
    'Показать дату',
    'Показать цитату',
    'Показать погоду',
    'Показать аудиоплеер',
    'Показать список дел',
  ],
};
let greetingTranslation = {
  en: [
    'Good Morning, ',
    'Good Afternoon, ',
    'Good Evening, ',
    'Good Night, ',
    'Error! There is no such city',
    'Wind speed: ',
    'm/s',
    'Humidity: ',
    'Enter Your Name',
    'Minsk',
  ],
  ru: [
    'Доброе утро, ',
    'Добрый день, ',
    'Добрый вечер, ',
    'Доброй ночи, ',
    'Ошибка! Город не найден',
    'Скорость ветра: ',
    'м/с',
    'Влажность: ',
    'Введите ваше имя',
    'Минск',
  ],
};

let settingTranslation = {
  en: ['Language', 'Pictures Source', 'Picture Tags', 'Show/hide blocks'],
  ru: [
    'Язык',
    'Источник изображений',
    'Теги изображений',
    'Показать/скрыть блок',
  ],
};

let language = 'en';

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

function showGreeting() {
  const hours = date.getHours();
  const timeOfDay = getTimeOfDay(hours, greetingTranslation[language]);
  return timeOfDay;
}

let randomNum;
function getRandomNum() {
  randomNum = Math.round(Math.random() * (20 - 1) + 1);
}
getRandomNum();
function getSlideNext() {
  if (randomNum === 20) {
    randomNum = 1;
  } else {
    randomNum = ++randomNum;
  }
  changePicturesSource();
}

function getSlidePrev() {
  if (randomNum === 1) {
    randomNum = 20;
  } else {
    randomNum = --randomNum;
  }
  changePicturesSource();
}
next.addEventListener('click', getSlideNext);
prev.addEventListener('click', getSlidePrev);

function setBg() {
  const img = new Image();
  let time = showGreeting();
  let bgNum = randomNum;
  if (bgNum < 10) {
    bgNum = bgNum.toString().padStart(2, 0);
  }
  tagsChoice.disabled = true;
  img.src = `https://github.com/gentoosiast/momentum-backgrounds/blob/main/${time}/${bgNum}.webp`;
  img.onload = () => {
    document.body.style.backgroundImage = `url('https://github.com/gentoosiast/momentum-backgrounds/blob/main/${time}/${bgNum}.webp')`;
  };
}

showTime();

city.addEventListener('change', function () {
  getWeather(greetingTranslation[language]);
});

name.placeholder = greetingTranslation[language][8];

function setLocalStorage() {
  localStorage.setItem('name', name.value);
  localStorage.setItem('city', city.value);
  localStorage.setItem('language', selectLang.value);
  localStorage.setItem('pictSource', selectPict.value);
  localStorage.setItem('tag', tagsChoice.value);
  localStorage.setItem('blocksArr', JSON.stringify(blocksArr));
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
    getWeather(greetingTranslation[language]);
  } else {
    city.value = greetingTranslation[language][9];
    getWeather(greetingTranslation[language]);
  }
  if (localStorage.getItem('language')) {
    selectLang.value = localStorage.getItem('language');
    changeLanguage();
  }
  if (localStorage.getItem('pictSource')) {
    if (localStorage.getItem('tag')) {
      tagsChoice.value = localStorage.getItem('tag');
    }
    selectPict.value = localStorage.getItem('pictSource');
    changePicturesSource();
  }
}
window.addEventListener('load', getLocalStorage);

async function getWeather(lang) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${language}&appid=f7a5bb3ea6bb02ada24c582c49e31962&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === '404' || data.cod === '400') {
    temperature.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
    weatherDescription.textContent = '';
    weatherIcon.className = '';
    error.textContent = lang[4];
  } else {
    error.textContent = '';
    weatherIcon.classList.add('weather-icon');
    weatherIcon.classList.add('owf');
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    wind.textContent = `${lang[5]} ${Math.round(data.wind.speed)} ${lang[6]}`;
    humidity.textContent = `${lang[7]} ${Math.round(data.main.humidity)}%`;
    weatherDescription.textContent = data.weather[0].description;
  }
}

async function getQuotes() {
  const quotes = `./assets/${language}.json`;
  const res = await fetch(quotes);
  const data = await res.json();
  randomNum = Math.round(Math.random() * 9);
  quote.textContent = `${data[randomNum].text}`;
  author.textContent = `${data[randomNum].author}`;
}
getQuotes();
changeButton.addEventListener('click', getQuotes);

let dayPart = showGreeting();
tagsChoice.value = `${dayPart}`;

async function getLinkToImageUnsplash() {
  tagsChoice.disabled = false;
  const img = new Image();

  const url = `https://api.unsplash.com/photos/random?query=${tagsChoice.value}&client_id=e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17`;
  const res = await fetch(url);
  const data = await res.json();

  img.src = data.urls.regular;
  img.onload = () => {
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
  };
}

async function getLinkToImageFlickr() {
  const img = new Image();
  if (!tagsChoice) {
    let time = showGreeting();
    tagsChoice = time;
  }
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b55647f1917b227bae34f0616880cac6&tags=${tagsChoice.value}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  randomNum = Math.round(Math.random() * (100 - 1) + 1);
  img.src = data.photos.photo[randomNum].url_l;
  img.onload = () => {
    document.body.style.backgroundImage = `url(${data.photos.photo[randomNum].url_l})`;
  };
}

function changeLanguage() {
  language = `${selectLang.value.toLowerCase()}`;
  getWeather(greetingTranslation[language]);
  showGreeting();
  getQuotes();
  langPar.textContent = settingTranslation[language][0];
  pictSource.textContent = settingTranslation[language][1];
  pictTags.textContent = settingTranslation[language][2];
  blocks.textContent = settingTranslation[language][3];
  name.placeholder = greetingTranslation[language][8];
  for (let i = 0; i < checkboxLabel.length; i++) {
    checkboxLabel[i].textContent = optionTranslation[language][i];
  }
}

changeLanguage();

selectLang.addEventListener('change', changeLanguage);

function changePicturesSource() {
  if (selectPict.value === 'GitHub') {
    setBg();
  } else if (selectPict.value === 'Unsplash API') {
    tagsChoice.addEventListener('change', getLinkToImageUnsplash);
    getLinkToImageUnsplash();
  } else {
    tagsChoice.addEventListener('change', getLinkToImageFlickr);
    getLinkToImageFlickr();
  }
}

selectPict.addEventListener('change', changePicturesSource);

let blocksArr = [];
let checked;

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

let localArr = JSON.parse(localStorage.getItem('blocksArr'));
checkboxes.forEach((el, index) => {
  if (localStorage.getItem('blocksArr')) {
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

