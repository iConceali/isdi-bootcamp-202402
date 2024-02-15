let audio = new Audio("./sound/startMenu.mpeg");
audio.volume = 0.5;
setTimeout(function () {
  audio.play();
}, 1000);

let btnStart = document.querySelector(".btn_start");

btnStart.addEventListener("click", function () {
  window.location.href = "./index.html";
});

let btnExit = document.querySelector(".btn_exit");

btnExit.addEventListener("click", function () {
  window.close();
});
