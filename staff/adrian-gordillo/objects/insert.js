function insertMany(object, index, ...values) {
  var extracted = {};

  if (!(object instanceof Object))
    throw new TypeError(object + " is not an Object");

  if (typeof index !== "number")
    throw new TypeError(index + " is not an Number");

  for (var i = 0; i < index; i++)
    extracted[Object.keys(extracted).length] = object[i];

  for (var value of values) extracted[Object.keys(extracted).length] = value;

  for (var i = index; i < object.length; i++)
    extracted[Object.keys(extracted).length] = object[i];

  for (var i = 0; i < Object.keys(extracted).length; i++)
    object[i] = extracted[i];

  //for (var key in extracted) {
  //  object = extracted[key];
  // }
  object.length += values.length;

  return object.length;
}

console.log("CASE 1: insert skyblue in index 1");

var colors = {
  0: "red",
  1: "blue",
  2: "green",
  length: 3,
};

var length = insertMany(colors, 1, "skyblue");

console.log(length);
// 4

console.log(colors);
/*
  {
    0: 'red',
    1: 'skyblue',
    2: 'blue',
    3: 'green',
    length: 4
  }
  */

console.log("CASE 2: insert skyblue, gold and plum in index 2");

var colors = {
  0: "red",
  1: "blue",
  2: "green",
  length: 3,
};

var length = insertMany(colors, 2, "skyblue", "gold", "plum");

console.log(length);
// 6

console.log(colors);
/*
  {
    0: 'red',
    1: 'blue',
    2: 'skyblue',
    3: 'gold',
    4: 'plum',
    5: 'green',
    length: 6
  }
  */

console.log("CASE 3: fails on undefind object parameter");

try {
  insertMany();
} catch (error) {
  console.log(error);
  // TypeError: undefined is not an Object
}

console.log("CASE 4: fails on 1 as an object parameter");

try {
  insertMany(1);
} catch (error) {
  console.log(error);
  // TypeError: 1 is not an Object
}

console.log("CASE 5: fails on undefined as index parameter");

var colors = {
  0: "red",
  1: "blue",
  2: "green",
  length: 3,
};

try {
  insertMany(colors);
} catch (error) {
  console.log(error);
  // TypeError: undefined is not a Number
}
