delete Array.prototype.map;

function map(arr, mapForm) {
  var newArr = [];
  if (mapForm === undefined) {
    /* for (var i = 0; i < arr.length; i++) {
      newArr[i] = arr[i];
    }
    return newArr;*/
    throw error;
  } else {
    for (var i = 0; i < arr.length; i++) {
      newArr[i] = mapForm(arr[i]);
    }
  }
  return newArr;
}

//CASE 1
console.log("CASE 1");

const array1 = [1, 4, 9, 16];

// Pass a function to map
const map1 = map(array1, (x) => x * 2);

console.log(map1);
// Expected output: Array [2, 8, 18, 32]

//CASE 2
console.log("CASE 2");

const numbers = [1, 4, 9];
const roots = map(numbers, (num) => Math.sqrt(num));

console.log(roots);
// Expected output: Array [1, 2, 3]

//CASE 3
console.log("CASE 3");

const kvArray = [
  { key: 1, value: 10 },
  { key: 2, value: 20 },
  { key: 3, value: 30 },
];

const reformattedArray = map(kvArray, ({ key, value }) => ({ [key]: value }));

console.log(reformattedArray);
//// Expected output:  [{ 1: 10 }, { 2: 20 }, { 3: 30 }]

// CASE 4
console.log("CASE 4");

const words = ["hello", "world", "javascript"];
const uppercasedWords = map(words, (word) => word.toUpperCase());
console.log(uppercasedWords);
// Expected output: ['HELLO', 'WORLD', 'JAVASCRIPT']

// CASE 5
console.log("CASE 5");

const temperaturesInCelsius = [0, 25, 100];
const temperaturesInFahrenheit = map(
  temperaturesInCelsius,
  (celsius) => (celsius * 9) / 5 + 32
);
console.log(temperaturesInFahrenheit);
// Expected output: [32, 77, 212]

// CASE 6
console.log("CASE 6");

const names = ["Alice", "Bob", "Charlie"];
const greetingMessages = map(names, (name) => `Hello, ${name}!`);
console.log(greetingMessages);
// Expected output: ['Hello, Alice!', 'Hello, Bob!', 'Hello, Charlie!']

//CASE 7
/*
console.log("CASE 7");

const undefinedTest = map(names);*/
