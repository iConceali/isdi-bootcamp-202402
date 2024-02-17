delete Array.prototype.join;

function join(arr, separator) {
  var result = "";

  if (separator === "") {
    for (var i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        result += join(arr[i], separator);
      } else {
        result += arr[i];
      }

      if (i < arr.length - 1) {
        result += separator;
      }
    }
  } else if (separator === undefined) {
    separator = ",";
    for (var i = 0; i < arr.length - 1; i++) {
      result += join(arr[i], separator) + separator;
    }
    result += join(arr[arr.length - 1], separator);
  } else {
    for (var i = 0; i < arr.length - 1; i++) {
      if (Array.isArray(arr[i])) {
        result += join(arr[i], separator) + separator;
      } else {
        result += arr[i] + separator;
      }
    }
    result += Array.isArray(arr[arr.length - 1])
      ? join(arr[arr.length - 1], separator)
      : arr[arr.length - 1];
  }

  return result;
}

// Resto del código sigue igual

// CASE 1
console.log("CASE 1");

const elements = ["Fire", "Air", "Water"];
console.log(join(elements));
// Expected output: "Fire,Air,Water"

// CASE 2
console.log("CASE 2");

console.log(join(elements, ""));
// Expected output: "FireAirWater"

// CASE 3
console.log("CASE 3");

console.log(join(elements, "-"));
// Expected output: "Fire-Air-Water"

// CASE 4
console.log("CASE 4");

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(join(matrix)); // 1,2,3,4,5,6,7,8,9
console.log(join(matrix, ";")); // 1,2,3;4,5,6;7,8,9
