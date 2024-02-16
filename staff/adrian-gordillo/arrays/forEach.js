delete Array.prototype.forEach;

function forEach(arr, callback) {
  var collbackType = typeof callback;

  if (
    collbackType !== "function" &&
    collbackType !== "object" &&
    collbackType !== "undefined"
  )
    throw new TypeError(collbackType + " " + callback + " is not a function");
  else if (collbackType === "object" || collbackType === "undefined")
    throw new TypeError(collbackType + " is not a function");

  for (var i = 0; i < arr.length; i++) {
    callback(arr[i], i, arr);
  }
}

console.log("CASE 1");

var nums = [10, 20, 30, 40, 50];

forEach(nums, function (num) {
  console.log(num);
});
// 10
// 20
// 30
// 40
// 50

console.log("CASE 2");

var nums = [10, 20, 30, 40, 50];
var sum = 0;

forEach(nums, function (num) {
  sum += num;
});

console.log(sum);
// 150

console.log("CASE 3");

var nums = [10, 20, 30, 40, 50];

forEach(nums, function (num, index) {
  console.log(num + index);
});
// 10
// 21
// 32
// 43
// 54

console.log("CASE 4");

var nums = [10, 20, 30, 40, 50];

forEach(nums, function (num, index, array) {
  console.log(num + index + array.length);
});
// 15
// 26
// 37
// 48
// 59

console.log("CASE 5");

var nums = [10, 20, 30, 40, 50];

try {
  forEach(nums);
} catch (error) {
  console.log(error);
  // TypeError: undefined is not a function
}

console.log("CASE 6");

var nums = [10, 20, 30, 40, 50];

try {
  forEach(nums, {});
} catch (error) {
  console.log(error);
  // TypeError: object is not a function
}

console.log("CASE 7");

var nums = [10, 20, 30, 40, 50];

try {
  forEach(nums, 123);
} catch (error) {
  console.log(error);
  // TypeError: number 123 is not a function
}

console.log("CASE 8");

var nums = [10, 20, 30, 40, 50];

try {
  forEach(nums, true);
} catch (error) {
  console.log(error);
  // TypeError: boolean true is not a function
}

console.log("CASE 9");

var nums = [10, 20, 30, 40, 50];

try {
  forEach(nums, !true);
} catch (error) {
  console.log(error);
  // TypeError: boolean false is not a function
}

/*//CASE 1
console.log("CASE 1");

const array1 = [1, 4, 9, 16];

// Pass a function to map
const map1 = array1.map();

console.log(map1);

const arrayTest = [];
const map2 = forEach(array1, (x) => console.log(x * 2));

// Expected output: Array [2, 8, 18, 32]
*/
