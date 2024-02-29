var Animal = require("./Animal");

function Pet(name, birthdate, country, weight) {
  this.name = name;
  this.birthdate = birthdate;
  this.country = country;
  this.weight = weight;
  this.sleeping = false;
  this.eating = "";
  this.legsSpeed = Pet.NOT_WALK;
}

Pet.NOT_WALK = 0;
Pet.WALK_VERY_SLOW = 1;
Pet.WALK_SLOW = 2;
Pet.WALK_NORMAL = 4;
Pet.WALK_FAST = 5;
Pet.RUN = 6;

Pet.prototype = new Animals();

Animal.prototype.sleep = function () {
  this.sleeping = true;
};

Animal.prototype.awake = function () {
  this.sleeping = false;
};

Animal.prototype.eat = function (food) {
  if (this.sleeping) throw new Error("try to eat on sleeping");

  this.eating = food;
};

Animal.prototype.moveLegs = function (speed) {
  this.legsSpeed = speed === undefined ? 4 : speed;
};

module.exports = Pet;
