delete Array.from;

function from(arr, mapForm) {
  var newArr = [];
  if (mapForm === undefined) {
    for (var i = 0; i < arr.length; i++) {
      newArr[i] = arr[i];
    }
    return newArr;
  } else {
    for (var i = 0; i < arr.length; i++) {
      newArr[i] = mapForm(arr[i]);
    }
  }
  return newArr;
}

//CASE 1
var arr = "papaya";
var func = from(arr);
console.log(func);
//deberia devolver: ['p', 'a', 'p', 'a', 'y', 'a']

//CASE 2
var arr = [1, 2, 3];
var func = from(arr);
console.log(from([1, 2, 3], (x) => x + x));
// deberia devolver: Array [2, 4, 6]

//CASE 3
var str = "hello";
var result = from(str, (char) => char + char);
console.log(result);
// Debería devolver: ["hh", "ee", "ll", "ll", "oo"]

//CASE 4
var numbers = [1, 2, 3, 4];
var result = from(numbers, (num) => num * num);
console.log(result);
// Debería devolver: [1, 4, 9, 16]

//CASE 5
var words = ["apple", "banana", "orange"];
var result = from(words, (word) => word.toUpperCase());
console.log(result);
// Debería devolver: ["APPLE", "BANANA", "ORANGE"]

//CASE 6
var numbers = [2, 7, 1, 9, 3, 6];
var result = from(numbers, (num) => (num > 5 ? num : undefined));
console.log(result);
// Debería devolver: [7, 9, 6]
