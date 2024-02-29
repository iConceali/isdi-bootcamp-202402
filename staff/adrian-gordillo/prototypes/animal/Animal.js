function Animal(name, birthdate, country, weight) {
  this.name = name;
  this.birthdate = birthdate;
  this.country = country;
  this.weight = weight;
  this.sleeping = false;
  this.eating = "";
  this.legsSpeed = Animal.NOT_WALK;
}

Animal.NOT_WALK = 0;
Animal.WALK_VERY_SLOW = 1;
Animal.WALK_SLOW = 2;
Animal.WALK_NORMAL = 4;
Animal.WALK_FAST = 5;
Animal.RUN = 6;

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

module.exports = Animal;
