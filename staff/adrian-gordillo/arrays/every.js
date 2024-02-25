delete Array.prototype.every;
var functions = require("./functions");

function every(array, callback) {
  var result;
  for (var i = 0; i < array.length; i++) {
    if (!callback(array[i]) || array[i] === undefined) return false;
  }
  return true;
}

/*
function copyArray(array) {
  var arrCopy = [];

  for (var i = 0; i < array.length; i++) {
    arrCopy[arrCopy.length] = array[i];
  }
  return arrCopy;
}

function conAssert(arrOriginal, arrCopy, result, expectedValue) {
  //comprobamos si el array original no ha sido modificado
  for (var i = 0; i < arrOriginal.length; i++) {
    console.assert(arrOriginal[i] === arrCopy[i], arrCopy[i]);
  }

  //comprobamos que la función principal devuelve el resultado que esperamos
  if (expectedValue !== undefined) {
    console.assert(
      expectedValue === result,
      "El resultado del collback no es el esperado"
    );
  }
  //console.assert(!expectedValue || valueFound, expectedValue);
}
*/
//CASE 1
console.log(
  "CASE 1: Devuelve true si collback cumple en todos los elementos del array 'true'"
);
var isBelowThreshold = (currentValue) => currentValue < 40;

var array1 = [1, 30, 39, 29, 10, 13];

var array1Copy = functions.copyArray(array1);

//console.log(array1Copy);
var result = every(array1, isBelowThreshold);

functions.conAssert(array1, array1Copy, result, true);

//console.log(result);
// Expected output: true
/*
console.assert(array1[0] === 1, 1);
console.assert(array1[1] === 30, 30);
console.assert(array1[2] === 39, 39);
console.assert(array1[3] === 29, 29);
console.assert(array1[4] === 10, 10);
console.assert(array1[5] === 13, 13);
console.assert(array1.length === 6, 6);
*/
//CASE 2
console.log(
  "CASE 2: Devuelve true si collback cumple en todos los elementos del array 'false'"
);

var result1 = every(array1, (x) => x < 4);

functions.conAssert(array1, array1Copy, result1, false);
//console.assert(result1 === false, "false");
//console.log(result1)
// Expected output: false
/*
console.assert(array1[0] === 1, 1);
console.assert(array1[1] === 30, 30);
console.assert(array1[2] === 39, 39);
console.assert(array1[3] === 29, 29);
console.assert(array1[4] === 10, 10);
console.assert(array1[5] === 13, 13);
console.assert(array1.length === 6, 6);
*/
//CASE 3
console.log(
  "CASE 3: Devuelve true si collback cumple en todos los elementos del array 'false'"
);
var result2 = every(array1, (x) => x > 2);

functions.conAssert(array1, array1Copy, result2, false);
//console.assert(result2 === true, "true");
//console.log(result2);
// Expected output: true
/*
console.assert(array1[0] === 1, 1);
console.assert(array1[1] === 30, 30);
console.assert(array1[2] === 39, 39);
console.assert(array1[3] === 29, 29);
console.assert(array1[4] === 10, 10);
console.assert(array1[5] === 13, 13);
console.assert(array1.length === 6, 6);
*/
