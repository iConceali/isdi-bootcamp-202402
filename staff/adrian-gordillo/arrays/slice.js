delete Array.prototype.slice;

function slice(array, indexStart, indexEnd) {
  let result = [];

  if (indexStart === undefined || indexStart >= array.length) {
    indexStart = 0;
  } else if (indexStart < 0) {
    indexStart += array.length;
  }

  if (indexEnd === undefined || indexEnd >= array.length) {
    indexEnd = array.length;
  } else if (indexEnd < 0) {
    indexEnd += array.length;
  }

  for (let i = indexStart; i < indexEnd && i < array.length; i++) {
    result[result.length] = array[i];
  }
  return result;
}

// CASE 1
console.log("CASE 1");

const animals = ["ant", "bison", "camel", "duck", "elephant"];

console.log(slice(animals, 2));
// Expected output: Array ["camel", "duck", "elephant"]

// CASE 2
console.log("CASE 2");

console.log(slice(animals, 2, 4));
// Expected output: Array ["camel", "duck"]

// CASE 3
console.log("CASE 3");

console.log(slice(animals, 1, 5));
// Expected output: Array ["bison", "camel", "duck", "elephant"]

// CASE 4
console.log("CASE 4");

console.log(slice(animals, -2));
// Expected output: Array ["duck", "elephant"]

// CASE 5
console.log("CASE 5");

console.log(slice(animals, 2, -1));
// Expected output: Array ["camel", "duck"]

// CASE 6
console.log("CASE 6");

console.log(slice(animals));
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]

//CASE 7
console.log("CASE 7");

let arr = ["azúcar", "especias", "muchas cosas bonitas", "sustancia X"];
let result = slice(arr, 3);
console.log(result);
//['sustancia X']

//CASE 8
console.log("CASE 8");

result = slice(arr, 1, 3);
console.log(result);
//['especias', 'muchas cosas bonitas']
