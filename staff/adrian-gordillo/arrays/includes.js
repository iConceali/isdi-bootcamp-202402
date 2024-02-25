//delete Array.prototype.includes;
var functions = require("./functions.js");

function includes(arr, valor, index) {
  if (index >= arr.length) {
    return false;
  } else if ((index < 0 && arr.length + index < 0) || index === undefined) {
    for (var i = 0; i < arr.length; i++) {
      if (valor === arr[i] || (isNaN(valor) && isNaN(arr[i]))) {
        return true;
      }
    }
  } else if (index < 0 && arr.length + index > 0) {
    for (var i = arr.length + index; i < arr.length; i++) {
      if (valor === arr[i]) {
        return true;
      }
    }
  } else {
    for (var i = index; i < arr.length; i++) {
      if (valor === arr[i]) {
        return true;
      }
    }
  }
  return false;
}

console.log(
  "CASE 1: includes() busca el valor (2) dentro del array tiene que devolver (true)"
);

var array = [1, 2, 3];
var arrayCopy = functions.copyArray(array);

var result = includes(array, 2); // true
var expectedValue = true;

functions.conAssert(array, arrayCopy, result, expectedValue);

console.log(
  "CASE 2: includes() busca el valor (4) dentro del array tiene que devolver (false)"
);

var result = includes(array, 4); // false
var expectedValue = false;

functions.conAssert(array, arrayCopy, result, expectedValue);

console.log(
  "CASE 3: includes() busca el valor (3) dentro del array a partir del indice (3) tiene que devolver (false)"
);

var result = includes(array, 3, 3); // false
var expectedValue = false;

functions.conAssert(array, arrayCopy, result, expectedValue);

console.log(
  "CASE 4: includes() busca el valor (3) dentro del array a partir del indice (-1) tiene que devolver (true)"
);

var result = includes(array, 3, -1); // true
var expectedValue = true;

functions.conAssert(array, arrayCopy, result, expectedValue);

console.log(
  "CASE 5: includes() busca el valor (NaN) dentro del array tiene que devolver (true)"
);

var array = [1, 2, NaN];
var arrayCopy = functions.copyArray(array);

var result = includes(array, NaN); // true
var expectedValue = true;

functions.conAssert(array, arrayCopy, result, expectedValue);

console.log(
  "CASE 6: includes() busca el valor númerico (3) dentro del array tiene que devolver (false)"
);

var array = ["1", "2", "3"];
var arrayCopy = functions.copyArray(array);

var result = includes(array, 3); // false
var expectedValue = false;

functions.conAssert(array, arrayCopy, result, expectedValue);
