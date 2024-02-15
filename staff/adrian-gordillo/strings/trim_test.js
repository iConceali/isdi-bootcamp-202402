delete String.prototype.trim;

function trim(string) {
  let result = "";
  let currentValor = "";

  for (let i = 0; i < string.length; i++) {
    if (
      string[i] !== " " ||
      string[i] !== "\n" ||
      string[i] !== "s" ||
      string[i] !== "\r"
    ) {
      result += string[i];
    }
  }

  return result;
}

// CASE 1

var s = "  hola mundo   ";

var result = trim(s);

console.log(result);
// 'hola mundo'

// CASE 2

var s = " \ns\r hola mundo \ns\r ";

var result = trim(s);

console.log(result);
// 'hola mundo'
