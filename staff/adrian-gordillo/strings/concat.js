delete String.prototype.concat;

function concat(...arr) {
  var result = "";

  if (arr.length === 0) {
    return result;
  }

  for (var i = 0; i < arr.length; i++) {
    result += arr[i];
  }

  return result;
}

const str1 = "Hello";
const str2 = "World";

console.log(concat(str1, " ", str2));
// Expected output: "Hello World"

console.log(concat(str2, ", ", str1));
// Expected output: "World, Hello"
