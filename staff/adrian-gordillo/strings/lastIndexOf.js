delete String.prototype.lastIndexOf;

function lastIndexOf(string, valor) {
  for (var i = string.length - 1; i >= 0; i--) {
    let coincidence = true;
    for (var j = valor.length - 1; j >= 0; j--) {
      if (string[i + j] !== valor[j]) {
        coincidence = false;
      }
    }

    if (coincidence === true) {
      return i;
    }
  }
  return -1;
}

console.log(lastIndexOf("Hola tio como estás, mundo como tio.", "tio"));

// CASE 1

var s = "hola mundo";

var index = lastIndexOf(s, "o");

console.log(index);
// 9

// CASE 2

var s = "hola mundo";

var index = lastIndexOf(s, "ol");

console.log(index);
// 1
