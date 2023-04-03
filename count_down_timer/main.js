let time = "00:01:00";
const timerDivElement = document.getElementById("timerDiv");
let timeUp;

function showTimer() {
  //displaying time
  timerDivElement.innerHTML = `${time}`;
  //adding css in timerDivElement
  applyCSS(timerDivElement);

  let timer = setInterval(function () {
    //set integer value in variable
    let hr = 0,
      min = 0,
      sec = 0;

    //if time up true then display your message
    timeUp = false;

    //use split method of string and split time
    //split time value is in string format inside array
    let t = time.split(":");
    //split time value is in string convert into integer(parseInt)
    hr = parseInt(t[0]);
    min = parseInt(t[1]);
    sec = parseInt(t[2]);

    //if sec is 0
    if (sec == 0) {
      if (min > 0) {
        sec = 59;
        min--;
      } else if (hr > 0) {
        min = 59;
        sec = 59;
        hr--;
      } else {
        timeUp = true;
      }
    } else {
      sec--;
    }

    //if hr, min, sec is single digit then add prefix
    if (hr < 10) hr = "0" + hr;
    if (min < 10) min = "0" + min;
    if (sec < 10) sec = "0" + sec;
    time = hr + ":" + min + ":" + sec;
    timerDivElement.innerHTML = time;

    if (timeUp) {
      time = "Your Time is over";
      timerDivElement.innerHTML = `${time}`;
      clearInterval(timer);
    }
  }, 100);
}


function applyCSS(timerDivElement) {
  timerDivElement.style.fontSize = "40px";
  timerDivElement.style.color = "teal";
  timerDivElement.style.fontWeight = "bold";
  timerDivElement.style.width = "150px";
  timerDivElement.style.padding = "10px";
  timerDivElement.style.textAlign = "center";
  timerDivElement.style.border = "3px solid green";
  timerDivElement.style.borderRadius = "30%";
}
