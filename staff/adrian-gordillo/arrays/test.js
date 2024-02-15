delete Array.prototype.indexOf;

function indexOf(arr, valor, index) {
  debugger;
  if (index >= arr.length) {
    return -1;
  } else if ((index < 0 && arr.length + index < 0) || index === undefined) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === valor) {
        return i;
      }
    }
  } else if (index < 0 && arr.length + index > 0) {
    for (var i = arr.length + index; i < arr.length; i++) {
      if (arr[i] === valor) {
        return i;
      }
    }
  } else {
    for (var i = index; i < arr.length; i++) {
      if (arr[i] === valor) {
        return i;
      }
    }
  }
  return -1;
}

// Resto del código...

// Ejemplo de uso
console.log(
  indexOf(["ant", "duck", "bison", "camel", "duck", "bison"], "duck")
);
// ... Resto de casos de prueba
console.log(
  indexOf(["ant", "duck", "bison", "camel", "duck", "bison"], "duck")
);

// CASE 1
var s1 = ["ant", "bison", "camel", "duck", "bison"];
var index1 = indexOf(s1, "bison");
console.log(index1); // Debería imprimir: 1

// CASE 2
var s2 = ["apple", "banana", "orange", "kiwi"];
var index2 = indexOf(s2, "orange");
console.log(index2); // Debería imprimir: 2

// CASE 3
var s3 = ["cat", "dog", "fish", "cat", "bird"];
var index3 = indexOf(s3, "cat");
console.log(index3); // Debería imprimir: 0

// CASE 4
var s4 = ["apple", "banana", "orange", "kiwi"];
var index4 = indexOf(s4, "grape");
console.log(index4); // Debería imprimir: -1 (ya que "grape" no está en el array)

// CASE 5
var s5 = ["apple", "banana", "orange", "kiwi"];
var index5 = indexOf(s5, "orange", 2);
console.log(index5); // Debería imprimir: -1
//(ya que la búsqueda comienza desde el índice 2 y "orange" está en el índice 2)

// CASE 6
var s6 = ["apple", "banana", "orange", "kiwi"];
var index6 = indexOf(s6, "banana", 1);
console.log(index6); // Debería imprimir: 1
//(ya que la búsqueda comienza desde el índice 1 y "banana" está en el índice 1)
