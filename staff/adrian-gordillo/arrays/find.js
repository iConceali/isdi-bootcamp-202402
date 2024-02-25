delete Array.prototype.find;
var functions = require("./functions.js");

function find(array, callback) {
  for (var i = 0; i < array.length; i++)
    if (callback(array[i])) return array[i];

  return undefined;
}

console.log("CASE 1: find first number greater thanb 10");

var array = [5, 1, 8, 3, 44];
var arrayCopy = functions.copyArray(array);

var result = find(array, (element) => element > 10);
var expectedValue = 44;

functions.conAssert(array, arrayCopy, result, expectedValue);
/*
console.assert(result === 44, "44");

console.assert(array[0] === 5, "5");
console.assert(array[1] === 1, "1");
console.assert(array[2] === 8, "8");
console.assert(array[3] === 3, "3");
console.assert(array[4] === 44, "44");
console.assert(array.length === 5, "5");
*/
console.log("CASE 2: find the first object that matches cherries");

var inventory = [
  { name: "apples", quantity: 2 },
  { name: "bananas", quantity: 0 },
  { name: "cherries", quantity: 5 },
];
var inventoryCopy = functions.copyArray(inventory);

var result = find(inventory, ({ name }) => name === "cherries");
var expectedValue = { name: "cherries", quantity: 5 };

functions.conAssert(inventory, inventoryCopy, result, expectedValue);
/*
console.assert(inventory[0].name === "apples", "apples");
console.assert(inventory[1].name === "bananas", "bananas");
console.assert(inventory[2].name === "cherries", "cherries");
console.assert(inventory[0].quantity === 2, 2);
console.assert(inventory[1].quantity === 0, 0);
console.assert(inventory[2].quantity === 5, 5);
console.assert(inventory.length === 3, 3);
*/
