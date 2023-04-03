let fillBar = document.querySelector(".seek .fill");
const playPauseBtn = document.querySelector(".play-pause");
const currentTime = document.querySelector(".time");
const volumeUp = document.querySelector(".volume-up");
let audios = ["song/1.mp3", "song/2.mp3", "song/3.mp3", "song/4.mp3", "song/5.mp3"];
const coverImg = ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg", "img/6.jpg"];


//
//Create an instance object of an audio
let audio = new Audio();
let currentSong = 0;

//
//Whenever the window load, song should play automatically.
window.onload = playSong;

function playSong() {
   audio.src = audios[currentSong];
   audio.play();
   playPauseBtn.innerHTML = `<i class="fa fa-pause"></i>`;
}

//
//click event on play/pause button
function togglePlayPause() {
   if (audio.paused) {
      audio.play();
      playPauseBtn.innerHTML = `<i class="fa fa-pause"></i>`;
      playPauseBtn.style.paddingLeft = "30px";
   } else {
      audio.pause();
      playPauseBtn.innerHTML = `<i class="fa fa-play"></i>`;
      playPauseBtn.style.paddingLeft = "33px";
   }
}

//
//Increasing in time, increase progress bar
audio.addEventListener("timeupdate", function () {
   let position = audio.currentTime / audio.duration;
   fillBar.style.width = position * 100 + "%";

   //display currentTime and totalDuration
   convertTime(Math.floor(audio.currentTime));

   //playNext Song automatically when currentSong Ended
   if (audio.ended) {
      nextAudio();
   }
})

function convertTime(seconds) {
   let min = Math.floor(seconds / 60);
   let sec = seconds % 60;

   //if single digit exists then add prefix on sec/min
   min = min < 10 ? "0" + min : min;
   sec = sec < 10 ? "0" + sec : sec;
   currentTime.textContent = `${min}:${sec}`;

   //display the total duration time
   //required min and sec
   totalDuration(Math.round(audio.duration));
}

function totalDuration(seconds) {
   let min = Math.floor(seconds / 60);
   let sec = seconds % 60;

   //if single digit exists then add prefix on sec/min
   min = min < 10 ? "0" + min : min;
   sec = sec < 10 ? "0" + min : sec;
   currentTime.textContent += ` & ${min}:${sec}`;
}

//clickEvent on nextButton
function nextAudio() {
   currentSong++;
   if (currentSong > audios.length) {
      currentSong = 0;
   }
   playSong();
   playPauseBtn.innerHTML = `<i class="fa fa-pause"></i>`;
   playPauseBtn.style.paddingLeft = "30px";
   //using jquery plugin for image changing
   $(".img img").attr("src", coverImg[currentSong]);
}

//clickEvent on prevButton
function prevAudio() {
   currentSong--;
   if (currentSong < 0) {
      currentSong = audios.length;
   }
   playSong();
   playPauseBtn.innerHTML = `<i class="fa fa-pause"></i>`;
   playPauseBtn.style.leftPadding = "30px";
   $(".img img").attr("src", coverImg[currentSong]);
}


//
//Volume Up , volume down, and mute button
function increaseVolume() {
   audio.volume += 0.25;
}

function decreaseVolume() {
   audio.volume -= 0.25;
}
volumeUp.addEventListener("click", function () {
   if (audio.volume === 1) {
      audio.volume = 0;
      volumeUp.innerHTML = `<i class="fa fa-volume-mute"></i>`;
   } else {
      audio.volume = 1;
      volumeUp.innerHTML = `<i class="fa fa-volume-up"></i>`;
   }
})