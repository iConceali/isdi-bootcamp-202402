delete Array.prototype.lastIndexOf;
var functions = require("./functions.js");

function lastIndexOf(arr, valor, index) {
  if (index >= arr.length) {
    return -1;
  } else if ((index < 0 && arr.length + index < 0) || index === undefined) {
    for (var i = arr.length - 1; i >= 0; i--) {
      if (valor === arr[i]) {
        return i;
      }
    }
  } else if (index < 0 && arr.length + index > 0) {
    for (var i = arr.length + index; i >= 0; i--) {
      if (valor === arr[i]) {
        return i;
      }
    }
  } else {
    for (var i = index; i >= 0; i--) {
      if (valor === arr[i]) {
        return i;
      }
    }
    if (valor === arr[i] || (isNaN(valor) && isNaN(arr[i]))) {
      return -1;
    }
  }
  return -1;
}

// CASE 1
console.log(
  "CASE 1: lastIndexOf() busca el último elemento (Dodo) en un array y devuelve su indice (3)"
);

var array = ["Dodo", "Tiger", "Penguin", "Dodo"];
var arrayCopy = functions.copyArray(array);

var result = lastIndexOf(array, "Dodo");
var expectedValue = 3;

// CASE 2
console.log(
  "CASE 2: lastIndexOf() busca el último elemento (Tiger) en un array y devuelve su indice (1)"
);

var arrayCopy = functions.copyArray(array);

var result = lastIndexOf(array, "Tiger");
var expectedValue = 1;

functions.conAssert(array, arrayCopy, result, expectedValue);

// CASE 3
console.log(
  "CASE 3: lastIndexOf() busca el último valor (2) en un array y devuelve su indice (3)"
);

var array = [2, 5, 9, 2];
var arrayCopy = functions.copyArray(array);

var result = lastIndexOf(array, 2);
var expectedValue = 3;

functions.conAssert(array, arrayCopy, result, expectedValue);

// CASE 4
console.log(
  "CASE 4: lastIndexOf() busca el último valor (7) en un array si no lo encuentra devuelve -1 (-1)"
);

var arrayCopy = functions.copyArray(array);

var result = lastIndexOf(array, 7);
var expectedValue = -1;

functions.conAssert(array, arrayCopy, result, expectedValue);

// CASE 5
console.log(
  "CASE 5: lastIndexOf() busca el último valor (2) a partir de un indice (3) en un array y devuelve su indice (3)"
);

var arrayCopy = functions.copyArray(array);

var result = lastIndexOf(array, 2, 3);
var expectedValue = 3;

functions.conAssert(array, arrayCopy, result, expectedValue);

// CASE 6
console.log(
  "CASE 6: lastIndexOf() busca el último valor (2) a partir de un indice (2) en un array y devuelve su indice (0)"
);

var arrayCopy = functions.copyArray(array);

var result = lastIndexOf(array, 2, 2);
var expectedValue = 0;

functions.conAssert(array, arrayCopy, result, expectedValue);

// CASE 7
console.log(
  "CASE 7: lastIndexOf() busca el último valor (2) a partir de un indice (-2) en un array y devuelve su indice (0)"
);

var arrayCopy = functions.copyArray(array);

var result = lastIndexOf(array, 2, -2);
var expectedValue = 0;

functions.conAssert(array, arrayCopy, result, expectedValue);

// CASE 8
console.log(
  "CASE 8: lastIndexOf() busca el último valor (2) a partir de un indice (-2) en un array y devuelve su indice (3)"
);

var arrayCopy = functions.copyArray(array);

var result = lastIndexOf(array, 2, -1);
var expectedValue = 3;

functions.conAssert(array, arrayCopy, result, expectedValue);

// CASE 9
console.log(
  "CASE 9: lastIndexOf() si busca un valor (NaN) en un array, siempre deolvera -1 (-1)"
);

var array = [NaN];
var arrayCopy = functions.copyArray(array);

var result = lastIndexOf(array, NaN);
var expectedValue = -1;

functions.conAssert(array, arrayCopy, result, expectedValue);
