let shipRect = ship.getBoundingClientRect();
let enemyRect = enemy.getBoundingClientRect();

if (shipRect.x + shipRect.width > enemyRect.x) {
  ship.src = "images/boom.gif";
}

setTimeout(function () {
  ship.style.display = "none";
  enemy.style.display = "none";
}, 1000);

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

setInterval(function () {
  moveenemyContainer();
  checkCollision();
}, 300);

function checkCollision() {
  let shipRect = ship.getBoundingClientRect();

  for (let i = 0; i < enemy.length; i++) {
    let enemyRect = enemy[i].getBoundingClientRect();

    if (
      shipRect.x < enemyRect.x + enemyRect.width &&
      shipRect.x + shipRect.width > enemyRect.x
    ) {
      ship.src = "images/boom.gif";
      enemy[i].src = "images/boom.gif";

      setTimeout(function () {
        ship.style.display = "none";
        enemy[i].style.display = "none";
      }, 1000);
    }
  }
}
