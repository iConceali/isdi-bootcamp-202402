delete Array.prototype.concat;

function concat(arr1, arr2) {
  var result = [];

  if (arr1.length === 0 || arr2.length === 0) {
    return result;
  }

  for (var i = 0; i < arr1.length; i++) {
    result[result.length] = arr1[i];
  }

  for (var j = 0; j < arr2.length; j++) {
    result[result.length] = arr2[j];
  }

  return result;
}

// CASE 1
var a = ["a", "b", "c"];
var b = ["d", "e", "f"];
console.log(concat(a, b));

// CASE 2
var c = [1, 2, 3];
var d = [4, 5, 6];
console.log(concat(c, d));

// CASE 3
var e = ["apple", "orange"];
var f = ["banana", "grape"];
console.log(concat(e, f));

// CASE 4
var g = [true, false];
var h = [1, 0];
console.log(concat(g, h));

// CASE 5
var l;
var m = ["pasto", 500];
console.log(concat(0, m));
