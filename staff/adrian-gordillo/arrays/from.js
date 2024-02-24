delete Array.from;

function from(arr, mapForm) {
  var newArr = [];
  if (mapForm === undefined) {
    for (var i = 0; i < arr.length; i++) {
      newArr[i] = arr[i];
    }
    return newArr;
  } else {
    for (var i = 0; i < arr.length; i++) {
      if (mapForm(arr[i]) !== undefined) {
        newArr[newArr.length] = mapForm(arr[i]);
      }
    }
  }
  return newArr;
}

function copyArray(array) {
  var arrCopy = [];
  var stringCopy = "";

  if (array instanceof Array) {
    for (var i = 0; i < array.length; i++) {
      arrCopy[arrCopy.length] = array[i];
    }
    return arrCopy;
  } else {
    for (var i = 0; i < array.length; i++) {
      stringCopy = array;
    }
    return stringCopy;
  }
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
  "CASE 1: from() devuelve un nuevo array a partir de un string el cual separa por letras"
);

var arr = "papaya";
var arrCopy = copyArray(arr);

var result = from(arr);
var expectedValue = ["p", "a", "p", "a", "y", "a"];

conAssert(arr, arrCopy, result, expectedValue);

console.log(
  "CASE 2: from() devuelve un nuevo array con los elementos sumados por si mismos"
);

var arr = [1, 2, 3];
var arrCopy = copyArray(arr);

var result = from(arr, (x) => x + x);
var expectedValue = [2, 4, 6];

conAssert(arr, arrCopy, result, expectedValue);

console.log(
  "CASE 3: from() devuelve un nuevo array con los elementos del string indicado por duplicados"
);

var arr = "hello";
var arrCopy = copyArray(arr);

var result = from(arr, (char) => char + char);
var expectedValue = ["hh", "ee", "ll", "ll", "oo"];

conAssert(arr, arrCopy, result, expectedValue);

console.log(
  "CASE 4: from() devuelve un nuevo array con los valores multiplicados por si mismos"
);

var numbers = [1, 2, 3, 4];
var numbersCopy = copyArray(numbers);

var result = from(numbers, (num) => num * num);
var expectedValue = [1, 4, 9, 16];

conAssert(numbers, numbersCopy, result, expectedValue);

console.log(
  "CASE 5: from() devuelve un nuevo array con los elementos del array original en mayusculas"
);

var words = ["apple", "banana", "orange"];
var wordsCopy = copyArray(words);

var result = from(words, (word) => word.toUpperCase());
var expectedValue = ["APPLE", "BANANA", "ORANGE"];

conAssert(words, wordsCopy, result, expectedValue);

console.log(
  "CASE 6: from() devuelve un nuevo array con los valores que sean superior a (5)"
);

var numbers = [2, 7, 1, 9, 3, 6];
var numbersCopy = copyArray(numbers);

var expectedValue = [7, 9, 6];
var result = from(numbers, (num) => (num > 5 ? num : undefined));

conAssert(numbers, numbersCopy, result, expectedValue);
