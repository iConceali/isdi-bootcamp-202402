delete Array.prototype.map;
var functions = require("./functions.js");

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
console.log(
  "CASE 1: map() aplica cada valor de un array a la función que le indiquemos y devuelve el resultado en un nuevo array ([2, 8, 18, 32])"
);

var array = [1, 4, 9, 16];
var arrayCopy = functions.copyArray(array);

var result = map(array, (x) => x * 2);
var expectedValue = [2, 8, 18, 32];

functions.conAssert(array, arrayCopy, result, expectedValue);

//CASE 2
console.log(
  "CASE 2: map() aplica cada valor de un array a la función que le indiquemos y devuelve el resultado en un nuevo array ([1, 2, 3])"
);

var array = [1, 4, 9];
var arrayCopy = functions.copyArray(array);

var result = map(array, (num) => Math.sqrt(num));
var expectedValue = [1, 2, 3];

functions.conAssert(array, arrayCopy, result, expectedValue);

//CASE 3
console.log(
  "CASE 3: map() aplica cada valor de un array a la función que le indiquemos y devuelve el resultado en un nuevo array ([{ 1: 10 }, { 2: 20 }, { 3: 30 }])"
);

var array = [
  { key: 1, value: 10 },
  { key: 2, value: 20 },
  { key: 3, value: 30 },
];
var arrayCopy = functions.copyArray(array);

var result = map(array, ({ key, value }) => ({ [key]: value }));
var expectedValue = [{ 1: 10 }, { 2: 20 }, { 3: 30 }];

functions.conAssert(array, arrayCopy, result, expectedValue);

// CASE 4
console.log(
  "CASE 4: map() aplica cada valor de un array a la función que le indiquemos y devuelve el resultado en un nuevo array (['HELLO', 'WORLD', 'JAVASCRIPT'])"
);

var array = ["hello", "world", "javascript"];
var arrayCopy = functions.copyArray(array);

var result = map(array, (word) => word.toUpperCase());
var expectedValue = ["HELLO", "WORLD", "JAVASCRIPT"];

functions.conAssert(array, arrayCopy, result, expectedValue);

// CASE 5
console.log(
  "CASE 5: map() aplica cada valor de un array a la función que le indiquemos y devuelve el resultado en un nuevo array ([32, 77, 212])"
);

var array = [0, 25, 100];
var arrayCopy = functions.copyArray(array);

var result = map(array, (celsius) => (celsius * 9) / 5 + 32);
var expectedValue = [32, 77, 212];

functions.conAssert(array, arrayCopy, result, expectedValue);

// CASE 6
console.log(
  "CASE 6: map() aplica cada valor de un array a la función que le indiquemos y devuelve el resultado en un nuevo array (['Hello, Alice!', 'Hello, Bob!', 'Hello, Charlie!'])"
);

var array = ["Alice", "Bob", "Charlie"];
var arrayCopy = functions.copyArray(array);

var result = map(array, (name) => `Hello, ${name}!`);
var expectedValue = ["Hello, Alice!", "Hello, Bob!", "Hello, Charlie!"];

functions.conAssert(array, arrayCopy, result, expectedValue);
//-------------------------------------
// CASE 7
console.log(
  "CASE 7: map() aplica cada valor de un array a la función que le indiquemos y devuelve el resultado en un nuevo array ([2, 8, 18, 32])"
);

var array = [1, 4, 9, 16];
var arrayCopy = functions.copyArray(array);

var result = map(array, function (x) {
  return x * 2;
});
var expectedValue = [2, 8, 18, 32];

functions.conAssert(array, arrayCopy, result, expectedValue);

// CASE 8
console.log(
  "CASE 8: map() aplica cada valor de un array a la función que le indiquemos y devuelve el resultado en un nuevo array ([1000, 2000, 3000, 4000, 5000])"
);

var array = [10, 20, 30, 40, 50];
var arrayCopy = functions.copyArray(array);

var result = map(array, function (num) {
  return num * 100;
});
var expectedValue = [1000, 2000, 3000, 4000, 5000];

functions.conAssert(array, arrayCopy, result, expectedValue);

// CASE 9
console.log(
  "CASE 9: map() aplica cada valor de un array a la función que le indiquemos y devuelve el resultado en un nuevo array (['A', 'B', 'C'])"
);

var array = ["a", "b", "c"];
var arrayCopy = functions.copyArray(array);

var result = map(array, function (char) {
  return char.toUpperCase();
});
var expectedValue = ["A", "B", "C"];

functions.conAssert(array, arrayCopy, result, expectedValue);

// CASE 10
console.log(
  "CASE 10: map() aplica cada valor de un array a la función que le indiquemos y devuelve el resultado en un nuevo array (['10, 0, [10,20,30]', '20, 1, [10,20,30]', '30, 2, [10,20,30]'])"
);

var array = [10, 20, 30];
var arrayCopy = functions.copyArray(array);

var result = map(array, function (element, index, array) {
  return element + ", " + index + ", [" + array + "]";
});
var expectedValue = [
  "10, 0, [10,20,30]",
  "20, 1, [10,20,30]",
  "30, 2, [10,20,30]",
];

functions.conAssert(array, arrayCopy, result, expectedValue);

// CASE 11
console.log(
  "CASE 11: map() aplica cada valor de un array a la función que le indiquemos y devuelve el resultado en un nuevo array ([{ name: 'Peter', piece: 28.48 },{ name: 'Wendy', piece: 30.38 },{ name: 'Pepito', piece: 18.99 },{ name: 'Campa', piece: 22.15 }])"
);

var array = [
  { name: "Peter", mark: 9 },
  { name: "Wendy", mark: 9.6 },
  { name: "Pepito", mark: 6 },
  { name: "Campa", mark: 7 },
];
var arrayCopy = functions.copyArray(array);
console.log(array === arrayCopy);
//array[0].name = "Fred";
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

var result = map(array, calculateCake);
var expectedValue = [
  { name: "Peter", piece: 28.48 },
  { name: "Wendy", piece: 30.38 },
  { name: "Pepito", piece: 18.99 },
  { name: "Campa", piece: 22.15 },
];

functions.conAssert(array, arrayCopy, result, expectedValue);
