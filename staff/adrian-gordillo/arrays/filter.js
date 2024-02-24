delete Array.prototype.filter;
const functions = require("./functions");

function filter(array, callback) {
  var newArr = [];

  for (var i = 0; i < array.length; i++) {
    if (callback(array[i])) newArr[newArr.length] = array[i];
  }
  return newArr;
}

console.log('CASE 1: filter() devuelve los valores que su length "sea < 6"');

var words = ["spray", "elite", "exuberant", "destruction", "present"];
var wordsCopy = functions.copyArray(words);

var result = filter(words, (word) => word.length > 6);
var expectedValue = ["exuberant", "destruction", "present"];

functions.conAssert(words, wordsCopy, result, expectedValue);

console.log('CASE 2: filter() devuelve los valores que "sean > 10"');

var numbers = [5, 12, 8, 15, 3];
var numbersCopy = functions.copyArray(numbers);

var result = filter(numbers, (num) => num > 10);
var expectedValue = [12, 15];

functions.conAssert(numbers, numbersCopy, result, expectedValue);

console.log(
  'CASE 3: filter() devuelve los valores que "contengan la letra (a)"'
);

var fruits = ["apple", "banana", "grape", "kiwi", "orange"];
var fruitsCopy = functions.copyArray(fruits);

var result = filter(fruits, (fruit) => fruit.includes("a"));

var expectedValue = ["apple", "banana", "grape", "orange"];

functions.conAssert(fruits, fruitsCopy, result, expectedValue);

console.log('CASE 4: filter() devuelve los valores que "sean pares"');

var numbers = [2, 7, 8, 14, 5, 10];
var numbersCopy = functions.copyArray(numbers);

var result = filter(numbers, (num) => num % 2 === 0);
var expectedValue = [2, 8, 14, 10];

functions.conAssert(numbers, numbersCopy, result, expectedValue);

console.log('CASE 5: filter() devuelve los valores que "sean >= 10"');

function isBigEnough(value) {
  return value >= 10;
}

var numbers = [12, 5, 8, 130, 44];
var numbersCopy = functions.copyArray(numbers);

var result = filter(numbers, isBigEnough);
var expectedValue = [12, 130, 44];

functions.conAssert(numbers, numbersCopy, result, expectedValue);

console.log('CASE 6: filter() devuelve los valores que "sean numeros primos"');

var numbers = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var numbersCopy = functions.copyArray(numbers);

function isPrime(num) {
  for (let i = 2; num > i; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return num > 1;
}

var result = filter(numbers, isPrime);
var expectedValue = [2, 3, 5, 7, 11, 13];

functions.conAssert(numbers, numbersCopy, result, expectedValue);

console.log('CASE 7: filter() devuelve los valores que "sean numerico y > 0"');

var arr = [
  { id: 15 },
  { id: -1 },
  { id: 0 },
  { id: 3 },
  { id: 12.2 },
  {},
  { id: null },
  { id: NaN },
  { id: "undefined" },
];
var arrCopy = functions.copyArray(arr);

function filterByID(item) {
  if (Number.isFinite(item.id) && item.id !== 0) {
    return true;
  }
  return false;
}

var result = filter(arr, filterByID);
var expectedValue = [{ id: 15 }, { id: -1 }, { id: 3 }, { id: 12.2 }];

functions.conAssert(arr, arrCopy, result, expectedValue);

//console.log(result);
// Filtered Array
// [{ id: 15 }, { id: -1 }, { id: 3 }, { id: 12.2 }]
