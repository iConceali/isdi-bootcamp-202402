delete Array.prototype.unshift;
debugger;
function unshift(array, ...elements) {
  var newArr = [];

  for (var i = 0; i < elements.length; i++) {
    newArr[i] = elements[i];
  }

  for (var i = 0; i < array.length; i++) {
    newArr[newArr.length] = array[i];
  }

  for (var i = 0; i < newArr.length; i++) {
    array[i] = newArr[i];
  }
  return array.length;
}

console.log("CASE 1");
const array1 = [1, 2, 3];

console.log(unshift(array1, 4, 5));
// Expected output: 5

console.log(array1);
// Expected output: Array [4, 5, 1, 2, 3]
