import { showGreeting } from "./timeAndDate.js";

const tagsChoice = document.querySelector('.tags-choice');
const selectPict = document.querySelector('.select-pictures');
let randomNum;

function getRandomNum() {
  randomNum = Math.round(Math.random() * (20 - 1) + 1);
}

getRandomNum();

export function setBg(language) {
  const img = new Image();
  const time = showGreeting(language);
  let bgNum = randomNum;
  if (bgNum < 10) {
    bgNum = bgNum.toString().padStart(2, 0);
  }
  tagsChoice.disabled = true;
  img.src = `https://raw.githubusercontent.com/pozdnyakoks/momentum-backgrounds/main/${time}/${bgNum}.webp`;
  img.onload = () => {
    document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/pozdnyakoks/momentum-backgrounds/main/${time}/${bgNum}.webp')`;
  };
}

export function changePicturesSource(language) {
  if (selectPict.value === 'GitHub') {
    setBg(language);
  } else if (selectPict.value === 'Unsplash API') {
    tagsChoice.addEventListener('change', getLinkToImageUnsplash);
    getLinkToImageUnsplash();
  } else {
    tagsChoice.addEventListener('change', getLinkToImageFlickr);
    getLinkToImageFlickr();
  }
}

export function getSlidePrev(language) {
  if (randomNum === 1) {
    randomNum = 20;
  } else {
    randomNum = --randomNum;
  }
  changePicturesSource(language);
}

export function getSlideNext(language) {
  if (randomNum === 20) {
    randomNum = 1;
  } else {
    randomNum = ++randomNum;
  }
  changePicturesSource(language);
}

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


