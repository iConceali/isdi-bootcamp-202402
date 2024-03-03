var assert = require("./assert");

var Actor = require("./Actor");
var Ship = require("./Ship");

console.log("Ship");

console.log("** Constructor **");

var ship = new Ship(50, 70);

assert.instanceOf(ship, Ship);
assert.instanceOf(ship, Actor);
assert.equalsValue(ship.constructor, Ship);

assert.equalsValue(ship.x, 0);
assert.equalsValue(ship.y, 0);
assert.equalsValue(ship.z, 0);

assert.equalsValue(ship.step, 10);

assert.equalsValue(ship.width, 50);
assert.equalsValue(ship.height, 70);

assert.equalsValue(ship.lifes, 3);

console.log("* moveLeft");
