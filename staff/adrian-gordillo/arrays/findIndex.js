delete Array.prototype.findindex;

function findIndex(array, callback) {
  for (var i = 0; i < array.length; i++) {
    if (callback(array[i])) return i;
  }
  return undefined;
}

console.log("CASE 1");

const array1 = [5, 12, 8, 130, 44];

const isLargeNumber = (element) => element > 13;

console.log(findIndex(array1, isLargeNumber));
// Expected output: 3
