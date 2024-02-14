function generateenemys(enemy, numberOfenemys) {
  //let enemyCount = "";

  for (let i = 0; i < numberOfenemys; i++) {
    enemy.innerHTML += `<img id="enemy" class="enemy" src="./image/cuqui.gif" alt="enemy" />`;
  }

  // enemy.enemyCount = enemyCount;
}

let enemyContainer = document.getElementById("enemy-container");
let enemy = document.getElementById("enemy");

generateenemys(enemyContainer, 20);

let ship = document.getElementById("ship");

let x = 50 - 2.17;
let y = 40;
let enemyContainerLeft = 0;
let direction = 1;

ship.style.left = x + "vw";
ship.style.top = y + "vw";
ship.style.bottom = y + "vw";

function moveEnemyContainer() {
  enemyContainerLeft += direction;

  if (enemyContainerLeft >= 22) {
    direction = -1;
  } else if (enemyContainerLeft <= -25) {
    direction = 1;
  }

  enemyContainer.style.left = enemyContainerLeft + "vw";
}

setInterval(function () {
  moveEnemyContainer();
  checkCollision();
}, 300);

setInterval(moveEnemyContainer, 300);

document.onkeydown = function (event) {
  if (event.key === "ArrowLeft") x = x - 1;
  else if (event.key === "ArrowRight") x = x + 1;

  if (x >= 95.66) x = 95.66;
  if (x <= 0) x = 0;

  if (event.key === "ArrowUp") y = y - 1;
  else if (event.key === "ArrowDown") y = y + 1;

  if (y >= 40) y = 40;
  if (y <= 0) y = 0;

  ship.style.top = y + "vw";
  ship.style.left = x + "vw";
};

function checkCollision() {
  let shipRect = ship.getBoundingClientRect();
  let enemyRect = enemy.getBoundingClientRect();

  if (shipRect.x + shipRect.width > enemyRect.x) {
    ship.src = "images/boom.gif";
    enemy.src = "images/boom.gif";
  }
  setTimeout(function () {
    ship.style.display = "none";
    enemy.style.display = "none";
  }, 1000);
}
