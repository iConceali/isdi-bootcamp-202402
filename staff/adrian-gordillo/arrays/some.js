delete Array.prototype.some;

function some(array, callback) {
  for (var i = 0; i < array.length; i++) {
    if (callback(array[i])) return true;
  }
  return false;
}

const array = [];

// Checks whether an element is even
const even = (element) => element % 2 === 0;

console.log(some(array, even));
// Expected output: true
