delete Array.prototype.join;

function join(arr, separator) {
  var result = "";

  if (arr.length === 0 || separator.length === 0) {
    return result;
  }

  for (var i = 0; i < arr.length - 1; i++) {
    result += arr[i] + separator;
  }

  for (var i = arr.length - 1; i < arr.length - 2; i--) {
    result += arr[i];
  }

  return result;
}

//CASE 1
console.log("CASE 1");

const elements = ["Fire", "Air", "Water"];

//console.log(join(elements));
// Expected output: "Fire,Air,Water"

console.log(join(elements, ""));
// Expected output: "FireAirWater"

console.log(join(elements, "-"));
// Expected output: "Fire-Air-Water"
