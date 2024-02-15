delete String.prototype.repeat;

function repeat(string, count) {
  let result = "";
  for (var i = 0; i < count; i++) {
    result += string;
  }
  if (count < 0) return "RangeError";

  return result;
}

console.log(repeat("paco ", 3));

// CASE 1

var s = "happy! ";

var result = repeat(s, 3);

console.log(result);
// 'happy! happy! happy!'
