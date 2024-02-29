function Person(name, surname, birthdate, country, height, weight) {
  this.name = name;
  this.surname = surname;
  this.birthdate = birthdate;
  this.country = country;
  this.height = height;
  this.weight = weight;
  this.sleeping = false;
  this.eating = "";
  this.legsSpeed = Person.NOT_WALK;
}

Person.NOT_WALK = 0;
Person.WALK_VERY_SLOW = 1;
Person.WALK_SLOW = 2;
Person.WALK_NORMAL = 4;
Person.WALK_FAST = 5;
Person.RUN = 6;

Person.prototype.sleep = function () {
  this.sleeping = true;
};

Person.prototype.awake = function () {
  this.sleeping = false;
};

Person.prototype.eat = function (food) {
  if (this.sleeping) throw new Error("try to eat on sleeping");

  this.eating = food;
};

Person.prototype.moveLegs = function (speed) {
  this.legsSpeed = speed === undefined ? 4 : speed;
};

Person.prototype.talk = function () {
  this.talking = true;
};

module.exports = Person;
