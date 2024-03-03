var assert = require("./assert");

var Actor = require("./Actor");

console.log("Actor");

console.log("** Constructor **");

var actor = new Actor(100, 50);

assert.instanceOf(actor, Actor);
assert.equalsValue(actor.constructor, Actor);

assert.equalsValue(actor.x, 0);
assert.equalsValue(actor.y, 0);
assert.equalsValue(actor.z, 0);

assert.equalsValue(actor.step, 1);

assert.equalsValue(actor.width, 100);
assert.equalsValue(actor.height, 50);
