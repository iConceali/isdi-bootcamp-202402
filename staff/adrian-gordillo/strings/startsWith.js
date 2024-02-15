function startsWith(string, valor) {
  let result = "";

  for (var i = 0; i < string.length; i++) {
    //valor.length ???
    result += string[i];
    if (result === valor) {
      return true;
    }
  }
  return false;
}
console.log(startsWith("Hola, mundo", ""));

// CASE 1

var s = "hola mundo";

var result = startsWith(s, "hol");

console.log(result);
// true

// CASE 2

var s = "hola mundo";

var result = startsWith(s, "holo");

console.log(result);
// false
