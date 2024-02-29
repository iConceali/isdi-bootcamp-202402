var assert = require("./assert");

var Animal = require("./Animal");

console.log("TEST Animal");

console.log("CASE constructor");

var animal = new Animal("Firulais", new Date(2010, 3, 22), "GB", 15);

assert.equalsValue(animal.name, "Firulais");
assert.instanceOf(animal.birthdate, Date);
assert.equalsValue(animal.birthdate.getFullYear(), 2010);
assert.equalsValue(animal.birthdate.getMonth(), 3);
assert.equalsValue(animal.birthdate.getDate(), 22);
assert.equalsValue(animal.weight, 15);
assert.equalsValue(animal.sleeping, false);
assert.equalsValue(animal.eating, "");
assert.equalsValue(animal.legsSpeed, 0);

console.log("CASE sleep");

var animal = new Animal("Firulais", new Date(2010, 3, 22), 15);

animal.sleep();

assert.equalsValue(animal.sleeping, true);

console.log("CASE awake");

var animal = new Animal("Firulais", new Date(2010, 3, 22), 15);

animal.sleeping = true;

animal.awake();

assert.equalsValue(animal.sleeping, false);

console.log("CASE eat");

var animal = new Animal("Firulais", new Date(2010, 3, 22), 15);

animal.eat("🍌");

assert.equalsValue(animal.eating, "🍌");

console.log("CASE eat on sleeping (unhappy)");

var animal = new Animal("Firulais", new Date(2010, 3, 22), 15);

animal.sleeping = true;

var errorThrown;

try {
  animal.eat("🍌");
} catch (error) {
  errorThrown = error;
}

assert.error(errorThrown, "Error", "try to eat on sleeping");

console.log("CASE not walk");

var animal = new Animal("Firulais", new Date(2010, 3, 22), 15);

animal.moveLegs(Animal.NOT_WALK);

assert.equalsValue(animal.legsSpeed, Animal.NOT_WALK);

console.log("CASE walk");

var animal = new Animal("Firulais", new Date(2010, 3, 22), 15);

animal.moveLegs();

assert.equalsValue(animal.legsSpeed, Animal.WALK_NORMAL);

console.log("CASE walk fast");

var animal = new Animal("Firulais", new Date(2010, 3, 22), 15);

animal.moveLegs(Animal.WALK_FAST);

assert.equalsValue(animal.legsSpeed, Animal.WALK_FAST);

console.log("CASE walk slow");

var animal = new Animal("Firulais", new Date(2010, 3, 22), 15);

animal.moveLegs(Animal.WALK_SLOW);

assert.equalsValue(animal.legsSpeed, Animal.WALK_SLOW);

console.log("CASE walk normal");

var animal = new Animal("Firulais", new Date(2010, 3, 22), 15);

animal.moveLegs(Animal.WALK_NORMAL);

assert.equalsValue(animal.legsSpeed, Animal.WALK_NORMAL);

console.log("CASE walk very slow");

var animal = new Animal("Firulais", new Date(2010, 3, 22), 15);

animal.moveLegs(Animal.WALK_VERY_SLOW);

assert.equalsValue(animal.legsSpeed, Animal.WALK_VERY_SLOW);

console.log("CASE run");

var animal = new Animal("Firulais", new Date(2010, 3, 22), 15);

animal.moveLegs(Animal.RUN);

assert.equalsValue(animal.legsSpeed, Animal.RUN);
