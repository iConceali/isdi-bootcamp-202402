delete Array.prototype.findindex;
var functions = require("./functions.js");

function findIndex(array, callback) {
  for (var i = 0; i < array.length; i++) {
    if (callback(array[i])) return i;
  }
  return undefined;
}

console.log(
  "CASE 1: filterIndex() devuelve el indice del valor que da como resultado el callback"
);

var numbers = [5, 12, 8, 130, 44];
var numbersCopy = functions.copyArray(numbers);

var isLargeNumber = (element) => element > 13;

var result = findIndex(numbers, isLargeNumber);
var expectedValue = 3;

functions.conAssert(numbers, numbersCopy, result, expectedValue);
