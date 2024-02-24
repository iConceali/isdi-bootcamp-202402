delete Array.prototype.findindex;

function findIndex(array, callback) {
  for (var i = 0; i < array.length; i++) {
    if (callback(array[i])) return i;
  }
  return undefined;
}

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

  // Comprobamos que la función principal devuelve el resultado que esperamos
  if (expectedValue !== undefined) {
    console.assert(
      expectedValue.toString() === result.toString(),
      "El resultado del callback no es el esperado"
    );
  }
}

console.log(
  "CASE 1: filterIndex() devuelve el indice del valor que da como resultado el callback"
);

var numbers = [5, 12, 8, 130, 44];
var numbersCopy = copyArray(numbers);

var isLargeNumber = (element) => element > 13;

var result = findIndex(numbers, isLargeNumber);
var expectedValue = 3;

conAssert(numbers, numbersCopy, result, expectedValue);
