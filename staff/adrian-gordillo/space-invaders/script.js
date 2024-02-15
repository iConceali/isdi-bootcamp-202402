function generateEnemy(enemy, numEnemy1, numEnemy2) {
  //let enemyCount = "";

  for (let i = 0; i < numEnemy1; i++) {
    enemy.innerHTML += `<img id="enemy${i}" class="enemy" src="./image/enemy_1.png" alt="enemy" />`;
  }
  for (let i = 0; i < numEnemy2; i++) {
    enemy.innerHTML += `<img id="enemy${i}" class="enemy enemy2" src="./image/enemy_2.png" alt="enemy" />`;
  }
  for (let i = 0; i < numEnemy1; i++) {
    enemy.innerHTML += `<img id="enemy${i}" class="enemy" src="./image/enemy_1.png" alt="enemy" />`;
  }
  // enemy.enemyCount = enemyCount;
}

let enemyContainer = document.getElementById("enemy-container");

generateEnemy(enemyContainer, 6, 6);

let enemies = document.querySelectorAll(".enemy");
let ship = document.getElementById("ship");
let score = 0;
let username = prompt("What's your name?");
//let userScore = [];

let x = 50 - 6.72;
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
  actualizarScore();
}, 100);

//setInterval(moveEnemyContainer, 300);

function checkCollision() {
  let shipRect = ship.getBoundingClientRect();

  // Recorrer todos los enemigos
  enemies.forEach((enemy) => {
    if (enemy.style.visibility !== "hidden") {
      let enemyRect = enemy.getBoundingClientRect();

      if (
        shipRect.x + shipRect.width > enemyRect.x &&
        shipRect.x < enemyRect.x + enemyRect.width &&
        shipRect.y + shipRect.height > enemyRect.y &&
        shipRect.y < enemyRect.y + enemyRect.height
      ) {
        let audio = new Audio("./sound/explosionSound.wav");
        audio.volume = 0.5;
        setTimeout(function () {
          audio.play();
        }, 50);
        ship.src = "./image/boom.gif";
        enemy.src = "./image/boom.gif";

        setTimeout(function () {
          x = 50 - 6.72;
          y = 40;
          ship.style.left = x + "vw";
          ship.style.top = y + "vw";

          ship.style.display = "block";
          ship.src = "./image/sp1.png";

          //enemy.style.display = "none";
          enemy.style.visibility = "hidden";
        }, 300);
      }
    }
  });
}
let bullets = [];
let bulletCount = false;

document.onkeydown = function (event) {
  if (event.key === "ArrowLeft") x = x - 1;
  else if (event.key === "ArrowRight") x = x + 1;

  let calcSizeShip = 100 - 7 * 0.96;
  if (x >= calcSizeShip) x = calcSizeShip;
  if (x <= 0) x = 0;

  if (event.key === "ArrowUp") y = y - 1;
  else if (event.key === "ArrowDown") y = y + 1;

  if (y >= 40) y = 40;
  if (y <= 0) y = 0;

  ship.style.top = y + "vw";
  ship.style.left = x + "vw";

  if (event.key === " ") {
    if (!bulletCount) {
      let bullet = document.createElement("div");
      bullet.className = "bullet";

      let bulletX = x + 0.5 * (0.82 * 7);
      let bulletY = y;

      bullet.style.left = bulletX + "vw";
      bullet.style.top = bulletY + "vw";

      document.getElementById("space").appendChild(bullet);

      bullets.push(bullet);

      let audio = new Audio("./sound/laserSound.mp3");
      audio.volume = 0.5;
      setTimeout(function () {
        audio.play();
      }, 50);
      bulletCount = true;
    }
  }
};

function moveBullets() {
  bullets.forEach((bullet) => {
    let bulletRect = bullet.getBoundingClientRect();

    bullet.style.top = bulletRect.y - 3 + "px";

    enemies.forEach((enemy) => {
      if (enemy.style.visibility !== "hidden") {
        let enemyRect = enemy.getBoundingClientRect();

        if (
          bulletRect.x + bulletRect.width > enemyRect.x &&
          bulletRect.x < enemyRect.x + enemyRect.width &&
          bulletRect.y + bulletRect.height > enemyRect.y &&
          bulletRect.y < enemyRect.y + enemyRect.height
        ) {
          let audio = new Audio("./sound/explosionSound.wav");
          audio.volume = 0.5;
          setTimeout(function () {
            audio.play();
          }, 50);
          bullet.remove();
          bulletCount = false;
          enemy.src = "./image/boom.gif";

          score += 100;

          setTimeout(function () {
            //enemy.style.display = "none";
            enemy.style.visibility = "hidden";
          }, 300);
        }
      }
    });

    if (bulletRect.top < 0) {
      bullet.remove();
      bulletCount = false;
    }
  });
}

function actualizarScore() {
  document.querySelector(
    ".spanUser"
  ).innerHTML = `<strong>${username}'s</strong>`;
  document.querySelector(".spanScore").innerHTML = `Score: ${score}</strong>`;
}

setInterval(moveBullets, 10);
