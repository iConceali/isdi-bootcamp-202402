let enemyContainer = document.getElementById("enemy-container");
let enemies = document.querySelectorAll(".enemy");
let ship = document.getElementById("ship");
let score = 0;
let username = prompt("What's your name?");
let userScores = []; // Nuevo array para almacenar información del usuario y puntuación

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
  updateScore();
}, 100);

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

function updateScore() {
  document.querySelector(
    ".spanScore"
  ).innerHTML = `<strong>${username}'s Score: ${score}</strong>`;
}

function saveScore() {
  userScores.push({ user: username, score: score }); // Añadir la puntuación al array
}

// Llamada a la función de guardar cuando se cierra la ventana o se recarga la página
window.addEventListener("beforeunload", saveScore);

// Mostrar el ranking
function mostrarRanking() {
  userScores.sort((a, b) => b.score - a.score); // Ordenar de mayor a menor
  console.log("Ranking:");
  userScores.forEach((user, index) => {
    console.log(`${index + 1}. ${user.user}: ${user.score}`);
  });
}

// Llamada a la función de mostrar el ranking al inicio
mostrarRanking();

setInterval(moveBullets, 10);
