delete String.prototype.at;

function at(string, index) {
  let result = "";

  if (index >= 0) {
    result = string[index];
  } else if (index < 0) {
    result = string[string.length + index];
  }
  return result;
}
console.log(at("Hola", -4));

// CASE 1

var s = "hola mundo";

var char = at(s, 6);
console.log(char);
// 'u'

// CASE 2

var s = "hola mundo";

var char = at(s, 20);
console.log(char);
// undefined

// CASE 3

var s = "hola mundo";

var char = at(s, -4);
console.log(char);
// 'u'

/*
let word = "Hola";

console.log(word.at(3));

const objeto = {a: 1, b: 2, c: 3};
const valor = Object.at(objeto, 'b'); // Accede al valor de la propiedad 'b'
*/
