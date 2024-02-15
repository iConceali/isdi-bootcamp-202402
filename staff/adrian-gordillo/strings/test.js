delete Array.prototype.push();

function push(array, element) {
  let result = [];

  for (var i = 0; i < array.length; i++) {
    result[result.length] = array[i];
  }

  result[result.length] = element;

  // Modificar el array de entrada
  for (var i = 0; i < result.length; i++) {
    array[i] = result[i];
  }

  return result.length;
}

//CASE 1
var nums = [100, 200, 300, 400, 500];
var length = push(nums, 600);
console.log(length);
console.log(nums);

//CASE 2
var animals = ["pigs", "goats", "sheep"];
var length = push(animals, "cows");
console.log(length);
console.log(animals);

//CASE 3
var sports = ["soccer", "baseball"];
var length = push(sports, "basketball");
console.log(length);
console.log(sports);
