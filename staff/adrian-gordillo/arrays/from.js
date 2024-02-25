delete Array.from;
var functions = require("./functions.js");

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

console.log(
  "CASE 1: from() devuelve un nuevo array a partir de un string el cual separa por letras"
);

var arr = "papaya";
var arrCopy = functions.copyArray(arr);

var result = from(arr);
var expectedValue = ["p", "a", "p", "a", "y", "a"];

functions.conAssert(arr, arrCopy, result, expectedValue);

console.log(
  "CASE 2: from() devuelve un nuevo array con los elementos sumados por si mismos"
);

var arr = [1, 2, 3];
var arrCopy = functions.copyArray(arr);

var result = from(arr, (x) => x + x);
var expectedValue = [2, 4, 6];

functions.conAssert(arr, arrCopy, result, expectedValue);

console.log(
  "CASE 3: from() devuelve un nuevo array con los elementos del string indicado por duplicados"
);

var arr = "hello";
var arrCopy = functions.copyArray(arr);

var result = from(arr, (char) => char + char);
var expectedValue = ["hh", "ee", "ll", "ll", "oo"];

functions.conAssert(arr, arrCopy, result, expectedValue);

console.log(
  "CASE 4: from() devuelve un nuevo array con los valores multiplicados por si mismos"
);

var numbers = [1, 2, 3, 4];
var numbersCopy = functions.copyArray(numbers);

var result = from(numbers, (num) => num * num);
var expectedValue = [1, 4, 9, 16];

functions.conAssert(numbers, numbersCopy, result, expectedValue);

console.log(
  "CASE 5: from() devuelve un nuevo array con los elementos del array original en mayusculas"
);

var words = ["apple", "banana", "orange"];
var wordsCopy = functions.copyArray(words);

var result = from(words, (word) => word.toUpperCase());
var expectedValue = ["APPLE", "BANANA", "ORANGE"];

functions.conAssert(words, wordsCopy, result, expectedValue);

console.log(
  "CASE 6: from() devuelve un nuevo array con los valores que sean superior a (5)"
);

var numbers = [2, 7, 1, 9, 3, 6];
var numbersCopy = functions.copyArray(numbers);

var expectedValue = [7, 9, 6];
var result = from(numbers, (num) => (num > 5 ? num : undefined));

functions.conAssert(numbers, numbersCopy, result, expectedValue);
