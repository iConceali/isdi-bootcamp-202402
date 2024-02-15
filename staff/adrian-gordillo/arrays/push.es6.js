delete Array.prototype.push();

function push(array, ...element) {
  for (let i = 0; i < element.length; i++) {
    array[array.length] = element[i];
  }
  return array.length;
}

//CASE 1
var nums = [100, 200, 300, 400, 500];

var length = push(nums, 600);

console.log(length);
//deberia devolver 6
console.log(nums);
// debería devolver [100, 200, 300, 400, 500, 600]

//CASE 2
var animals = ["pigs", "goats", "sheep"];

var length = push(animals, "cows");

console.log(length);
//debería devolver 4
console.log(animals);
// debería devolver ['pigs', 'goats', 'sheep', 'cows']

//CASE 3
var sports = ["soccer", "baseball"];

var length = push(sports);

console.log(length);
//tendría que devolver 2
console.log(sports);
// tendría que devolver ['soccer', 'baseball']

// CASE 4
var sports = ["soccer", "baseball"];

var length = push(sports, undefined);

console.log(length);
// tendría que devolver 3
console.log(sports);
// tendría que devolver ['soccer', 'baseball', undefined]
