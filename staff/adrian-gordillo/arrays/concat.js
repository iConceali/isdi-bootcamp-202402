delete Array.prototype.concat;

function concat(arr, ...arrays) {
  var result = [];

  if (arr instanceof Array === false)
    throw new TypeError(arr + " is not an Array");

  /*
  if (arr.length === 0 || arrays.length === 0) {
    return result;
  }
*/
  for (var i = 0; i < arr.length; i++) {
    result[i] = arr[i];
  }

  for (var i = 0; i < arrays.length; i++) {
    if (arrays[i] instanceof Array) {
      for (var j = 0; j < arrays[i].length; j++) {
        result[result.length] = arrays[i][j];
      }
    } else {
      result[result.length] = arrays[i];
    }
  }

  return result;
}

function copyArray(array) {
  var arrCopy = [];

  for (var i = 0; i < array.length; i++) {
    arrCopy[arrCopy.length] = array[i];
  }
  return arrCopy;
}

function conAssert(result, ...arrays) {
  var currentIndex = 0;

  for (var i = 0; i < arrays.length; i++) {
    if (arrays[i] instanceof Array) {
      for (var j = 0; j < arrays[i].length; j++) {
        console.assert(
          result[j + currentIndex] === arrays[i][j],
          result[j + currentIndex]
        );
      }
      currentIndex += arrays[i].length;
    } else {
      console.assert(result[currentIndex] === arrays[i], arrays[i]);
      currentIndex++;
    }
  }
}

// CASE 1
console.log("CASE 1: concatena todas las arrays asignadas");
var arr1 = ["a", "b", "c"];
var arr2 = ["d", "e", "f"];

var aCopy = copyArray(arr1);
var bCopy = copyArray(arr2);

var result = concat(arr1, arr2);
//arr1[0] = "r";
//conAssert(result, arr1, arr2);

//console.log(aCopy);
//console.assert(a[2] === aCopy[2], "c");
//console.log(result);

//CASE 2
console.log("CASE 2: concatena todas las arrays asignadas");

var arr3 = ["make", "it", "stop"];
var result = concat(arr1, arr2, arr3);
conAssert(result, arr1, arr2, arr3);
//console.log(result)
//CASE 3
console.log("CASE 3: concatena todas las arrays asignadas");

var str = "please";
var result = concat(arr1, arr2, arr3, str);
conAssert(result, arr1, arr2, arr3, str);
//console.log(result)
//CASE 4
console.log("CASE 4: concatena todas las arrays asignadas");

var obj = { name: "Pepito" };
var result = concat(arr1, obj);

conAssert(result, arr1, obj);
console.log(result);
