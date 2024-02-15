delete Array.prototype.forEach;

function forEach(arr, mapForm) {
  for (var i = 0; i < arr.length; i++) {
    mapForm(arr[i]);
  }
}

//CASE 1
console.log("CASE 1");

const array1 = [1, 4, 9, 16];

// Pass a function to map
const map1 = array1.map();

console.log(map1);

const arrayTest = [];
const map2 = forEach(array1, (x) => console.log(x * 2));

// Expected output: Array [2, 8, 18, 32]
