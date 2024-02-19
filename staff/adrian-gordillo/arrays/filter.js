delete Array.prototype.filter;

function filter(array, callback) {
  var newArr = [];

  for (var i = 0; i < array.length; i++) {
    if (callback(array[i])) newArr[newArr.length] = array[i];
  }
  return newArr;
}

console.log("CASE 1");

const words = ["spray", "elite", "exuberant", "destruction", "present"];

const result = filter(words, (word) => word.length > 6);

console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"]

console.log("CASE 2");

const numbers = [5, 12, 8, 15, 3];

const resultNumbers = filter(numbers, (num) => num > 10);

console.log(resultNumbers);
// Expected output: Array [12, 15]

console.log("CASE 3");

const fruits = ["apple", "banana", "grape", "kiwi", "orange"];

const resultFruits = filter(fruits, (fruit) => fruit.includes("a"));

console.log(resultFruits);
// Expected output: Array ["apple", "banana", "grape", "orange"]

console.log("CASE 4");

const evenNumbers = [2, 7, 8, 14, 5, 10];

const resultEvenNumbers = filter(evenNumbers, (num) => num % 2 === 0);

console.log(resultEvenNumbers);
// Expected output: Array [2, 8, 14, 10]

console.log("CASE 5");

function isBigEnough(value) {
  return value >= 10;
}

const newNumbers = [12, 5, 8, 130, 44];

const filtered = filter(newNumbers, isBigEnough);
// filtered is [12, 130, 44]
console.log(filtered);

console.log("CASE 6");

const array = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

function isPrime(num) {
  for (let i = 2; num > i; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return num > 1;
}

console.log(filter(array, isPrime)); // [2, 3, 5, 7, 11, 13]

console.log("CASE 7");

const arr = [
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

let invalidEntries = 0;

function filterByID(item) {
  if (Number.isFinite(item.id) && item.id !== 0) {
    return true;
  }
  invalidEntries++;
  return false;
}

const arrByID = filter(arr, filterByID);

console.log("Filtered Array\n", arrByID);
// Filtered Array
// [{ id: 15 }, { id: -1 }, { id: 3 }, { id: 12.2 }]

console.log("Number of Invalid Entries =", invalidEntries);
// Number of Invalid Entries = 5
