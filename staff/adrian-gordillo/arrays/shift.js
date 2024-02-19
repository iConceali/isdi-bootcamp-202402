delete Array.prototype.shift;

function shift(array) {
  var first = array[0];

  for (var i = 1; i < array.length; i++) {
    array[i - 1] = array[i];
  }
  array.length--;

  return first;
}

// CASE 1

var nums = [10, 20, 30];

var firstElement = shift(nums);

console.log(nums);
// Expected output: Array [20, 30]

console.log(firstElement);
// Expected output: 10

// CASE 2

var animals = ["elephant", "sheep", "cow", "dog"];

var firstElement = shift(animals);

console.log(animals);
// ['sheep', 'cow', 'dog']

console.log(firstElement);
// 'elephant'

// CASE 3

var cocktails = [
  "margharita",
  "sex on the beach",
  "bloody mary",
  "gintonic",
  "mojito",
  "daikiri",
];

var firstElement = shift(cocktails);

console.log(cocktails);
// ['sex on the beach', 'bloody mary', 'gintonic', 'mojito', 'daikiri']

console.log(firstElement);
// 'margharita'

// CASE 4

var nums = [10, 20];

var firstElement = shift(nums);

console.log(nums);
// [20]

console.log(firstElement);
// 10

// CASE 5

var nums = [
  100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400,
  1500, 1600, 1700, 1800, 1900, 2000,
];

var firstElement = shift(nums);

console.log(firstElement);
// 100
console.log(nums);
// [200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000]
