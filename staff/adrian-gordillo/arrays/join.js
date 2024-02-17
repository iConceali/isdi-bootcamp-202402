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
