delete Array.prototype.lastIndexOf;

function lastIndexOf(arr, valor, index) {
  if (index >= arr.length) {
    return -1;
  } else if ((index < 0 && arr.length + index < 0) || index === undefined) {
    for (var i = arr.length - 1; i >= 0; i--) {
      if (valor === arr[i]) {
        return i;
      }
    }
  } else if (index < 0 && arr.length + index > 0) {
    for (var i = arr.length + index; i >= 0; i--) {
      if (valor === arr[i]) {
        return i;
      }
    }
  } else {
    for (var i = index; i >= 0; i--) {
      if (valor === arr[i]) {
        return i;
      }
    }
    if (valor === arr[i] || (isNaN(valor) && isNaN(arr[i]))) {
      return -1;
    }
  }
  return -1;
}

// CASE 1
console.log("CASE 1");

const animals = ["Dodo", "Tiger", "Penguin", "Dodo"];

console.log(lastIndexOf(animals, "Dodo"));
// Expected output: 3

console.log(lastIndexOf(animals, "Tiger"));
// Expected output: 1

// CASE 2
console.log("CASE 2");

const numbers = [2, 5, 9, 2];
console.log(lastIndexOf(numbers, 2)); // 3
console.log(lastIndexOf(numbers, 7)); // -1
console.log(lastIndexOf(numbers, 2, 3)); // 3
console.log(lastIndexOf(numbers, 2, 2)); // 0
console.log(lastIndexOf(numbers, 2, -2)); // 0
console.log(lastIndexOf(numbers, 2, -1)); // 3

// CASE 3
console.log("CASE 3");

const array = [NaN];
lastIndexOf(array, NaN);

console.log(lastIndexOf(array, NaN));
