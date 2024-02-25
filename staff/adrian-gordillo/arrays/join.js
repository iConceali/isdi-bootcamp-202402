delete Array.prototype.join;
var functions = require("./functions.js");

//--No he podido sacarlo por mi cuenta el caso 5 y 6
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
console.log(
  'CASE 1: join() junta todos los valores/elementos de un array con un separador (" ") debería devolver ("hola caracola venite")'
);

var array = ["hola", "caracola", "venite"];
var arrayCopy = functions.copyArray(array);

var result = joinArray(array, " ");
var expectedValue = "hola caracola venite";

functions.conAssert(array, arrayCopy, result, expectedValue);
//'hola caracola venite'

//CASE 2
console.log(
  'CASE 2: join() junta todos los valores/elementos de un array con un separador ("-") debería devolver ("1-2-3")'
);

var array1 = [1, 2, 3];
var arrayCopy1 = functions.copyArray(array1);

result = joinArray(array1, "-");
var expectedValue = "1-2-3";

functions.conAssert(array1, arrayCopy1, result, expectedValue);
//'1-2-3'

//CASE 3
console.log(
  'CASE 3: join() junta todos los valores/elementos de un array como no se le indica separador por defecto (,) debería devolver ("hola,caracola,venite")'
);

result = joinArray(array);
var expectedValue = "hola,caracola,venite";

functions.conAssert(array, arrayCopy, result, expectedValue);
//hola,caracola,venite

//CASE 4
console.log(
  'CASE 4: join() junta todos los valores/elementos de un array con un separador ("") debería devolver ("123")'
);

result = joinArray(array1, "");
var expectedValue = "123";

functions.conAssert(array1, arrayCopy1, result, expectedValue);
//'123'

//CASE 5
console.log(
  'CASE 5: join() junta todos los valores/elementos de un array con un separador (";") debería devolver ("1,2,3;4,5,6;7,8,9")'
);

var array = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
var arrayCopy = functions.copyArray(array);

result = joinArray(array, ";");
var expectedValue = "1,2,3;4,5,6;7,8,9";

functions.conAssert(array, arrayCopy, result, expectedValue);
//'1,2,3;4,5,6;7,8,9'

//CASE 6
console.log(
  'CASE 6: join() junta todos los valores/elementos de un array con un separador (";") debería devolver ("1;3,,4;2")'
);

var array = [];
var array1 = [1, [3, array, 4], 2];
var arrayCopy = functions.copyArray(array);
var arrayCopy1 = functions.copyArray(array1);

result = joinArray(array1, ";");
var expectedValue = "1;3,,4;2";

functions.conAssert(array1, arrayCopy1, result, expectedValue);
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
