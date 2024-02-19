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
      newArr[i] = mapForm(arr[i], i, arr);
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
//-------------------------------------
console.log("CASE 7");

var nums = [1, 4, 9, 16];

var numsX2 = map(nums, function (x) {
  return x * 2;
});

console.log(numsX2);
// [2, 8, 18, 32]

console.log(nums);
// [1, 4, 9, 18]

console.log("CASE 8");

var nums = [10, 20, 30, 40, 50];

var numsX100 = map(nums, function (num) {
  return num * 100;
});

console.log(numsX100);
// [1000, 2000, 3000, 4000, 5000]
console.log(nums);
// [10, 20, 30, 40, 50]

console.log("CASE 9");

var chars = ["a", "b", "c"];

var charsInUpper = map(chars, function (char) {
  return char.toUpperCase();
});

console.log(charsInUpper);
// ['A', 'B', 'C']
console.log(chars);
// ['a', 'b', 'c']

console.log("CASE 10");

var nums = [10, 20, 30];

var result = map(nums, function (element, index, array) {
  return element + ", " + index + ", [" + array + "]";
});

console.log(result);
//['10, 0, [10,20,30]', '20, 1, [10,20,30]', '30, 2, [10,20,30]']

console.log(nums);
// [10, 20, 30]

console.log("CASE 11");

var data = [
  { name: "Peter", mark: 9 },
  { name: "Wendy", mark: 9.6 },
  { name: "Pepito", mark: 6 },
  { name: "Campa", mark: 7 },
];

function calculateCake(element, index, array) {
  // ex: (7/31.6 * 100).toFixed(2)

  var sum = 0;

  for (var i = 0; i < array.length; i++) {
    var item = array[i];

    sum += item.mark;
  }

  var piece = parseFloat(((element.mark / sum) * 100).toFixed(2));

  return { name: element.name, piece: piece };
}

var cake = map(data, calculateCake);

console.log(cake);
/*
[
    { name: 'Peter', piece:  },
    { name: 'Wendy', piece:  },
    { name: 'Pepito', piece:  },
    { name: 'Campa', piece:  }
]
*/

console.log(data);
/*
[
    { name: 'Peter', mark: 9 },
    { name: 'Wendy', mark: 9.6 },
    { name: 'Pepito', mark: 6 },
    { name: 'Campa', mark: 7 }
]
*/
