delete Array.prototype.at;
const functions = require("./functions.js");

function at(arr, index) {
  var result = "";

  if (index >= 0) {
    result = arr[index];
  } else if (index < 0) {
    result = arr[arr.length + index];
  }
  return result;
}
/*
function copyArray(array) {
  var arrCopy = [];

  for (var i = 0; i < array.length; i++) {
    arrCopy[arrCopy.length] = array[i];
  }
  return arrCopy;
}

function conAssert(arr1, arr2, expectedValue) {
  var valueFound = false;

  for (var i = 0; i < arr1.length; i++) {
    console.assert(arr1[i] === arr2[i], arr2[i]);

    if (expectedValue !== undefined && expectedValue === arr1[i]) {
      valueFound = true;
    }
  }

  console.assert(!expectedValue || valueFound, expectedValue);
}
*/

// CASE 1
console.log(
  "CASE 1: Devuelve el valor que encuentra en el indice indicado (400)"
);
var nums = [100, 200, 300, 400, 500];
var numsCopy = functions.copyArray(nums);

var result = at(nums, 3);
var expectedValue = 400;

functions.conAssert(nums, numsCopy, result, expectedValue);

// CASE 2
console.log(
  'CASE 2: Devuelve el valor que encuentra en el indice indicado (" ")'
);
var chars = ["h", "o", "l", "a", " ", "m", "u", "n", "d", "o"];
var charsCopy = functions.copyArray(chars);

var result = at(chars, 4);
var expectedValue = " ";

functions.conAssert(chars, charsCopy, result, expectedValue);

// CASE 3
console.log(
  'CASE 3: Devuelve el valor que encuentra en el indice indicado ("n")'
);
var chars = ["h", "o", "l", "a", " ", "m", "u", "n", "d", "o"];
var charCopy = functions.copyArray(chars);

var result = at(chars, -3);
var expectedValue = "n";

functions.conAssert(chars, charsCopy, result, expectedValue);

// CASE 4
console.log('CASE 4: Devuelve "undefined" al no encontrar ningún resultado');

var chars = ["h", "o", "l", "a", " ", "m", "u", "n", "d", "o"];
var charsCopy = functions.copyArray(chars);

var expectedValue = undefined;
var result = at(chars, -30);

functions.conAssert(chars, charsCopy, result, expectedValue);
