var Animal = require("./Animal");

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

Person.prototype = new Animal();

Person.prototype.talk = function () {
  this.talking = true;
};

module.exports = Person;
