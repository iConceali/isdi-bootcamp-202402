delete String.prototype.split;
function split(string, separator) {
  let result = [];
  let currentValor = "";

  for (let i = 0; i < string.length; i++) {
    if (string[i] !== separator) {
      currentValor = currentValor + string[i];
    } else {
      result[result.length] = currentValor;
      currentValor = "";
    }
  }
  result[result.length] = currentValor;
  return result;
}
console.log(split("hola mundo", " "));

// CASE 1

var s = "hola mundo";

var words = split(s, " ");

console.log(words);
// ['hola', 'mundo']

/*
function split(string, separator) {}

var s = "hola mundo";

var words = s.split(" ");
console.log(words);
// ['hola', 'mundo']
*/
