/**
 * Extracts an element that matches the condition from an iterable object.
 *
 * @param object - The iterable object to mutate.
 * @param index - The index from which to extract a value.
 *
 * @throws {TypeError} When object is not an object, or when index is not a number.
 */
function extract(object, callback) {
  var extracted = {};

  if (!(object instanceof Object))
    throw new TypeError(object + " is not an Object");

  if (!(callback instanceof Function))
    throw new TypeError(callback + " is not an Function");

  for (var i = 0; i < object.length; i++) {
    if (callback(object[i])) {
      extracted = object[i];

      for (var j = i; j < object.length - 1; j++) {
        object[j] = object[j + 1];
      }

      delete object[object.length - 1];
      object.length--;

      break;
    }
  }

  return extracted;
}

console.log("CASO 1: Extraer usuario 'Pepito' de 'users'");

var users = {
  0: { name: "Wendy", age: 19 },
  1: { name: "Peter", age: 20 },
  2: { name: "Pepito", age: 50 },
  3: { name: "Campa", age: 30 },
  4: { name: "James", age: 40 },
  length: 5,
};

var user = extract(users, function (user) {
  return user.name === "Pepito";
});

console.log(user);
// { name: 'Pepito', age: 50 }

console.log(users);
/*
          {
              0: { name: 'Wendy', age: 19 },
              1: { name: 'Peter', age: 20 },
              2: { name: 'Campa', age: 30 },
              3: { name: 'James', age: 40 },
              length: 4
          }
      */
console.log("CASO 2: callback is not a Function");

try {
  extract(users, 123);
} catch (error) {
  console.log(error);
  // TypeError: undefined is not an Object
}
