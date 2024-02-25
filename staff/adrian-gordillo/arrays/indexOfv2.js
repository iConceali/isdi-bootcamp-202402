delete Array.prototype.indexOf;
var functions = require("./functions.js");

function indexOf(arr, valor, index) {
  if (index >= arr.length) {
    return -1;
  } else if ((index < 0 && arr.length + index < 0) || index === undefined) {
    for (var i = 0; i < arr.length; i++) {
      if (valor === arr[i]) {
        return i;
      }
    }
  } else if (index < 0 && arr.length + index > 0) {
    for (var i = arr.length + index; i < arr.length; i++) {
      if (valor === arr[i]) {
        return i;
      }
    }
  } else {
    for (var i = index; i < arr.length; i++) {
      if (valor === arr[i]) {
        return i;
      }
    }
  }
  return -1;
}

console.log(
  indexOf(["ant", "duck", "bison", "camel", "duck", "bison"], "duck")
);

// CASE 1
console.log(
  "CASE 1: indexOf() busca un valor/elemento (bison) dentro de un array. Si lo encuentra devuelve el indice en el que lo encontró (1)"
);

var array = ["ant", "bison", "camel", "duck", "bison"];
var arrayCopy = functions.copyArray(array);

var result = indexOf(array, "bison");
var expectedValue = 1;

functions.conAssert(array, arrayCopy, result, expectedValue);

// CASE 2
console.log(
  "CASE 2: indexOf() busca un valor/elemento (orange) dentro de un array. Si lo encuentra devuelve el indice en el que lo encontró (2)"
);

var array = ["apple", "banana", "orange", "kiwi"];
var arrayCopy = functions.copyArray(array);

var result = indexOf(array, "orange");
var expectedValue = 2;

functions.conAssert(array, arrayCopy, result, expectedValue);

// CASE 3
console.log(
  "CASE 3: indexOf() busca un valor/elemento (cat) dentro de un array. Si lo encuentra devuelve el indice en el que lo encontró (0)"
);

var array = ["cat", "dog", "fish", "cat", "bird"];
var arrayCopy = functions.copyArray(array);

var result = indexOf(array, "cat");
var expectedValue = 0;

functions.conAssert(array, arrayCopy, result, expectedValue);

// CASE 4
console.log(
  "CASE 4: indexOf() busca un valor/elemento (grape) dentro de un array. Si no lo encuentra devuelve el valor -1 (-1)"
);

var array = ["apple", "banana", "orange", "kiwi"];
var arrayCopy = functions.copyArray(array);

var result = indexOf(array, "grape");
var expectedValue = -1;

functions.conAssert(array, arrayCopy, result, expectedValue);

// CASE 5
console.log(
  "CASE 5: indexOf() busca un valor/elemento (orange) a partir del indice (2) dentro de un array. Si lo encuentra devuelve el indice en el que lo encontró (2)"
);

var array = ["apple", "banana", "orange", "kiwi"];
var arrayCopy = functions.copyArray(array);

var result = indexOf(array, "orange", 2);
var expectedValue = 2;

functions.conAssert(array, arrayCopy, result, expectedValue);

// CASE 6
console.log(
  "CASE 6: indexOf() busca un valor/elemento (banana) a partir del indice (1) dentro de un array. Si lo encuentra devuelve el indice en el que lo encontró (1)"
);
var array = ["apple", "banana", "orange", "kiwi"];
var arrayCopy = functions.copyArray(array);

var result = indexOf(array, "banana", 1);
var expectedValue = 1;

functions.conAssert(array, arrayCopy, result, expectedValue);
