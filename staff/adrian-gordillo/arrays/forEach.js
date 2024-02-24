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

function copyArray(array) {
  var arrCopy = [];

  for (var i = 0; i < array.length; i++) {
    arrCopy[arrCopy.length] = array[i];
  }
  return arrCopy;
}

function conAssert(arrOriginal, arrCopy, result, expectedValue) {
  //comprobamos si el array original no ha sido modificado
  for (var i = 0; i < arrOriginal.length; i++) {
    console.assert(arrOriginal[i] === arrCopy[i], arrCopy[i]);
  }

  // Comprobamos que la función principal devuelve el resultado que esperamos
  if (expectedValue !== undefined) {
    console.assert(
      expectedValue === result,
      "El resultado del callback no es el esperado"
    );
  }
}

console.log(
  "CASE 1: forEach itera por todos los elementos del array y ejecuta un console.log por cada valor"
);

var numbers = [10, 20, 30, 40, 50];
var numbersCopy = copyArray(numbers);

var result = forEach(numbers, function (num) {
  //console.log(num);
});
conAssert(numbers, numbersCopy);

console.log(
  "CASE 2: forEach itera por todos los elementos y devuelve la suma de todos los elementos"
);

var numbers = [10, 20, 30, 40, 50];
var sum = 0;
var numbersCopy = copyArray(numbers);

forEach(numbers, function (num) {
  sum += num;
});

var result = sum;
var expectedValue = 150;

conAssert(numbers, numbersCopy, result, expectedValue);

console.log(
  "CASE 3: forEach itera por todos los elementos y devuelve la suma de todos los elementos con sus respectivos indices"
);
var numbers = [10, 20, 30, 40, 50];
var numbersCopy = copyArray(numbers);

forEach(numbers, function (num, index) {
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
/*
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

*/
