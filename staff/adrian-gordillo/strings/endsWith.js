delete String.prototype.endsWith;

function endsWith(string, valor) {
  let result = "";

  for (var i = string.length - valor.length; i < string.length; i++) {
    result += string[i];
    if (result === valor) {
      return true;
    }
  }
  return false;
}
console.log(endsWith("Hola, mundo", "mundo"));

// CASE 1

var s = "hola mundo";

var result = endsWith(s, "ndo");

console.log(result);
// true

// CASE 2

var s = "hola mundo";

var result = endsWith(s, "dos");

console.log(result);
// false

/*
const frase = "Hola, mundo";

console.log(frase.length);
const terminaConMundo = frase.endsWith("mundo");

console.log(terminaConMundo);
*/
