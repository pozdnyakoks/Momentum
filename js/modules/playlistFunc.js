import playList from '../../assets/playList.js';

const playlistCont = document.querySelector('.play-list');
const prevSong = document.querySelector('.play-prev');
const nextSong = document.querySelector('.play-next');
const play = document.querySelector('.play');
const progressCont = document.querySelector('.progress-container');
const progressBar = document.querySelector('.progress');
const songName = document.querySelector('.song-name');
const curTime = document.querySelector('.current-time');
const endTime = document.querySelector('.end-time');
const volume = document.querySelector('.volume');
const volumeCont = document.querySelector('.volume-progress-container');
const volumeProgress = document.querySelector('.volume-progress');

export default function playlistFunc() {
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
    const minutes = Math.floor(num / 60);
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
}