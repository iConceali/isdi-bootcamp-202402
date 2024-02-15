delete Array.prototype.includes;

function includes(arr, valor, index) {
  if (index >= arr.length) {
    return false;
  } else if ((index < 0 && arr.length + index < 0) || index === undefined) {
    for (var i = 0; i < arr.length; i++) {
      if (valor === arr[i] || (isNaN(valor) && isNaN(arr[i]))) {
        return true;
      }
    }
  } else if (index < 0 && arr.length + index > 0) {
    for (var i = arr.length + index; i < arr.length; i++) {
      if (valor === arr[i]) {
        return true;
      }
    }
  } else {
    for (var i = index; i < arr.length; i++) {
      if (valor === arr[i]) {
        return true;
      }
    }
  }
  return false;
}

const array1 = [1, 2, 3];
const array2 = [1, 2, NaN];
const array3 = ["1", "2", "3"];

console.log(includes(array1, 2)); // true
console.log(includes(array1, 4)); // false
console.log(includes(array1, 3, 3)); // false
console.log(includes(array1, 3, -1)); // true
console.log(includes(array2, NaN)); // true
console.log(includes(array3, 3)); // false
