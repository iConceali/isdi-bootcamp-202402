delete Array.prototype.pop();

//--------SOLUCIÓN 1--------//
/*
function pop(arr) {
  var result;

  if (arr.length === 0) {
    result = undefined;
  } else {
    var lastIndex = arr.length - 1;
    result = arr[lastIndex];

    arr.length = lastIndex;
  }
  return result;
}*/

//--------SOLUCIÓN 2--------//
function pop(arr) {
  if (arr.length > 0) {
    var lastIndex = arr.length - 1;
    var result = arr[lastIndex];

    arr.length--;
    return result;
  }
}

// CASE 1

var nums = [100, 200, 300, 400, 500];

var num = pop(nums);

console.log(num);
// deberia dar 500
console.log(nums.length);
// deberia dar 4
console.log(nums);
// deberia dar [100, 200, 300, 400]

// CASE 2

var animals = ["pigs", "goats", "sheep", "cows"];

var animal = pop(animals);

console.log(animal);
// deberia dar 'cows'
console.log(animals.length);
// deberia dar 3
console.log(animals);
// deberia dar ['pigs', 'goats', 'sheep']

// CASE 3

var sports = ["soccer", "baseball"];

var sport = pop(sports);

console.log(sport);
// debería dar 'baseball'
console.log(sports.length);
// debería dar 1
console.log(sports);
// debería dar ['soccer']

// CASE 4

var sports = [];

var sport = pop(sports);

console.log(sport);
// debería dar undefined
console.log(sports.length);
// debería dar 0
console.log(sports);
// debería dar []
