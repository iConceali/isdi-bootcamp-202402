var assert = require("./assert");

var Pet = require("./Pet");
var Person = require("./Person");
var Animal = require("./Animal");

console.log("TEST Pet");

console.log("CASE constructor");

var person = new Person(
  "Peter",
  "Pan",
  new Date(2000, 0, 31, 16, 45),
  "GB",
  140,
  50
);
var pet = new Pet(person, "Sultan", new Date(2000, 0, 31, 16, 45), "GB", 50);

assert.instanceOf(pet, Pet);
assert.instanceOf(pet, Animal);
assert.equalsValue(pet.constructor, Pet);

assert.equalsValue(pet.name, "Sultan");
assert.instanceOf(pet.birthdate, Date);
assert.equalsValue(pet.birthdate.getFullYear(), 2000);
assert.equalsValue(pet.birthdate.getMonth(), 0);
assert.equalsValue(pet.birthdate.getDate(), 31);
assert.equalsValue(pet.birthdate.getHours(), 16);
assert.equalsValue(pet.birthdate.getMinutes(), 45);
assert.equalsValue(pet.weight, 50);
assert.equalsValue(pet.sleeping, false);
assert.equalsValue(pet.eating, "");
assert.equalsValue(pet.legsSpeed, 0);

console.log("CASE toString");

var person = new Person(
  "Peter",
  "Pan",
  new Date(2000, 0, 31, 16, 45),
  "GB",
  140,
  50
);
var pet = new Pet(person, "Sultan", new Date(2000, 0, 31, 16, 45), "GB", 50);

assert.equalsValue(pet.toString(), "Pet (Sultan, 2000-01-31)");

console.log("CASE constructor fails on non-Person owner");

var errorThrown;

try {
  new Pet(undefined, "Sultan", new Date(2000, 0, 31, 16, 45), "GB", 50);
} catch (error) {
  errorThrown = error;
}

assert.error(errorThrown, "TypeError", "owner is not a Person");
