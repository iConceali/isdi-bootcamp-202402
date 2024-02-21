delete Array.prototype.splice;

function splice(array, index, numElement, element) {
  var newArr = [];
  var extractArray = [];

  for (var i = 0; i < index; i++) {
    newArr[i] = array[i];
  }

  if (numElement === 0) {
    newArr[index] = element;
  } else {
    // for (var i = index; i < index + numElement; i++) {
    newArr[newArr.length] = element;
    //}
    for (var i = 0; i < numElement; i++)
      extractArray[extractArray.length] = array[index + i];
  }

  for (var i = index + numElement; i < array.length; i++) {
    newArr[newArr.length] = array[i];
  }

  for (var i = 0; i < newArr.length; i++) {
    array[i] = newArr[i];
  }

  //array.length = index + numElement - 1;

  return extractArray;
}

console.log("CASE 1");

const months = ["Jan", "March", "April", "June"];
var extract1 = splice(months, 1, 0, "Feb");

console.log(extract1);
// Inserts at index 1
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]

console.log("CASE 2");

var extract2 = splice(months, 4, 1, "May");
// Replaces 1 element at index 4
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]
console.log(extract2);

console.log("CASE 3");

const months1 = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
];

var extract3 = splice(months1, 3, 4, "X");
// Replaces 1 element at index 4
console.log(months1);
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]
console.log(extract3);
