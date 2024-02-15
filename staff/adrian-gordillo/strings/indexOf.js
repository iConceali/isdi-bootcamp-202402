delete String.prototype.indexOf;

function indexOf(string, valor) {
  //let result = "";

  for (var i = 0; i < string.length; i++) {
    let coincidence = true;
    for (var j = 0; j < valor.length; j++) {
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

console.log(
  indexOf(
    "Hola tio como estás, mundo. Pero creo que vine al mundo para caer",
    "como"
  )
);

// CASE 1

var s = "hola mundo";

var index = indexOf(s, "ola");

console.log(index);
// 1

// CASE 2

var s = "hola mundo";

var index = indexOf(s, "olaf");

console.log(index);
// -1
