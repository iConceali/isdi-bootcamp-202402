var assert = require("./assert");

var Animal = require("./Animal");
var Pet = require("./Pet");
var Dog = require("./Dog");
var Person = require("./Person");

console.log("TEST Dog");

console.log("CASE constructor");

var person = new Person(
  "Peter",
  "Pan",
  new Date(2000, 0, 31, 16, 45),
  "GB",
  140,
  50
);
var dog = new Dog(
  person,
  "Firulais",
  new Date(2010, 3, 22),
  "GB",
  25,
  55,
  "Husky",
  "white"
);

assert.equalsValue(dog.constructor, Dog);
assert.instanceOf(dog, Dog);
assert.instanceOf(dog, Pet);
assert.instanceOf(dog, Animal);

assert.equalsValue(dog.name, "Firulais");
assert.instanceOf(dog.birthdate, Date);
assert.equalsValue(dog.birthdate.getFullYear(), 2010);
assert.equalsValue(dog.birthdate.getMonth(), 3);
assert.equalsValue(dog.birthdate.getDate(), 22);
assert.equalsValue(dog.country, "GB");
assert.equalsValue(dog.weight, 25);
assert.equalsValue(dog.size, 55);
assert.equalsValue(dog.breed, "Husky");
assert.equalsValue(dog.color, "white");

assert.equalsValue(dog.sleeping, false);
assert.equalsValue(dog.eating, "");
assert.equalsValue(dog.barking, false);
assert.equalsValue(dog.energyLevel, 100);
assert.equalsValue(dog.tricks, "");

//TODO
console.log("CASE bark");

var person = new Person(
  "Peter",
  "Pan",
  new Date(2000, 0, 31, 16, 45),
  "GB",
  140,
  50
);
var dog = new Dog(
  person,
  "Firulais",
  new Date(2010, 3, 22),
  "GB",
  25,
  55,
  "Husky",
  "white"
);

dog.bark();

assert.equalsValue(dog.barking, true);

//TODO
console.log("CASE tsssh");

var person = new Person(
  "Peter",
  "Pan",
  new Date(2000, 0, 31, 16, 45),
  "GB",
  140,
  50
);
var dog = new Dog(
  person,
  "Firulais",
  new Date(2010, 3, 22),
  "GB",
  25,
  55,
  "Husky",
  "white"
);

dog.barking = true;

dog.tsssh();

assert.equalsValue(dog.barking, false);
