delete Array.prototype.splice;

function splice(array, index, numElement, element) {
  var newArr = [];

  for (var i = 0; i < index; i++) {
    newArr[i] = array[i];
  }

  if (numElement === 0) {
    newArr[index] = element;
  } else {
    for (var i = index; i < index + numElement; i++) {
      newArr[newArr.length] = element;
    }
  }

  for (var i = index + numElement; i < array.length; i++) {
    newArr[newArr.length] = array[i];
  }

  for (var i = 0; i < newArr.length; i++) {
    array[i] = newArr[i];
  }

  return newArr;
}

console.log("CASE 1");

const months = ["Jan", "March", "April", "June"];
splice(months, 1, 0, "Feb");
// Inserts at index 1
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]

console.log("CASE 2");

splice(months, 4, 1, "May");
// Replaces 1 element at index 4
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]
