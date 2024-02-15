delete String.prototype.slice;

function slice(string, indexStart, indexEnd) {
  let result = "";

  if (indexStart === undefined || indexStart >= string.length) {
    indexStart = 0;
  } else if (indexStart < 0) {
    indexStart = string.length + indexStart;
  }

  if (indexEnd === undefined || indexEnd >= string.length) {
    indexEnd = string.length;
  } else if (indexEnd < 0) {
    indexEnd = string.length + indexEnd;
  }

  for (let i = indexStart; i < indexEnd && i < string.length; i++) {
    result = result + string[i];
  }
  return result;
}

//console.log(slice("hola mundo", 5, 8));

// CASE 1

var s = "hola mundo";

var piece = slice(s, 5, 8);

console.log(piece);
// 'mun'

// CASE 2

var s = "hola mundo";

var piece = slice(s, -5, -1);

console.log(piece);
// 'ndo'

/*
var s = "hola mundo";

var place = s.slice(5, 8);
console.log(place);
// 'mun'
*/
