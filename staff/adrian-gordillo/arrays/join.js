delete Array.prototype.join;
//--No he podido sacarlo po rmi cuenta el caso 5
function joinArray(array, separator) {
  let string = "";
  if (separator === undefined) separator = ",";
  for (var i = 0; i < array.length - 1; i++) {
    if (array[i] instanceof Array === false) string += array[i] + separator;
    else string += joinArray(array[i]) + separator;
  }
  if (array[array.length - 1] instanceof Array === false)
    if (array.length === 0) string += "";
    else string += array[array.length - 1];
  else string += joinArray(array[i]);
  return string;
}

//CASE 1

var arr = ["hola", "caracola", "venite"];
var result = joinArray(arr, " ");
console.log(result);
//'hola caracola venite'

//CASE 2
var arr1 = [1, 2, 3];
result = joinArray(arr1, "-");
console.log(result);
//'1-2-3'

//CASE 3
result = joinArray(arr);
console.log(result);
//hola,caracola,venite

//CASE 4
result = joinArray(arr1, "");
console.log(result);
//'123'

//CASE 5
var matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
result = joinArray(matrix, ";");
console.log(result);
//'1,2,3;4,5,6;7,8,9'

//CASE 6
let arr2 = [];
let arr3 = [1, [3, arr2, 4], 2];
result = joinArray(arr3, ";");
//'1;3,,4;2'

//----mi codogio
/*
delete Array.prototype.join;
//--Trabajando en ello...
function join(arr, separator) {
  var result = "";

  if (separator === "") {
    for (var i = 0; i < arr.length; i++) {
      result += arr[i];
      if (i < arr.length - 1) {
        result += separator;
      }
    }
  } else if (separator === undefined) {
    separator = ",";
    if (arr[i] instanceof Array === true) {
      for (var i = 0; i < arr.length - 1; i++) {
        result += arr[i] + separator;
      }
      result += arr[arr.length - 1];
    }
    for (var i = 0; i < arr.length - 1; i++) {
      result += arr[i] + separator;
    }
    result += arr[arr.length - 1];
  } else {
    for (var i = 0; i < arr.length - 1; i++) {
      result += arr[i] + separator;
    }
    result += arr[arr.length - 1];
  }

  return result;
}

//CASE 1
console.log("CASE 1");

const elements = ["Fire", "Air", "Water"];

console.log(join(elements));
// Expected output: "Fire,Air,Water"

//CASE 2
console.log("CASE 2");

console.log(join(elements, ""));
// Expected output: "FireAirWater"

//CASE 3
console.log("CASE 3");

console.log(join(elements, "-"));
// Expected output: "Fire-Air-Water"

//CASE 4
console.log("CASE 4");

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(join(matrix)); // 1,2,3,4,5,6,7,8,9
console.log(join(matrix, ";")); // 1,2,3;4,5,6;7,8,9
*/
