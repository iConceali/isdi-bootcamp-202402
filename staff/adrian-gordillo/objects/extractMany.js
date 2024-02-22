/**
 * Extracts elements that match the condition from an iterable object.
 *
 * @param object - The iterable object to mutate.
 * @param callback - The condition function to apply for extraction.
 *
 * @throws {TypeError} When object is not an object.
 */
function extractMany(object, callback) {
  if (!(object instanceof Object)) {
    throw new TypeError(object + " is not an Object");
  }

  if (!(callback instanceof Function)) {
    throw new TypeError(callback + " is not a Function");
  }

  var extracted = { length: 0 };
  var index = 0;

  for (var i = 0; i < object.length; i++) {
    if (callback(object[i])) {
      extracted[index++] = object[i];
      extracted.length++;
      object.length--;

      for (var j = i; j < object.length; j++) {
        object[j] = object[j + 1];
      }

      delete object[object.length];

      i--;
    }
  }

  return extracted;
}

console.log("CASE 1: Extracts many users from users");

var users = {
  0: { name: "Wendy", age: 19 },
  1: { name: "Peter", age: 20 },
  2: { name: "Pepito", age: 50 },
  3: { name: "Campa", age: 30 },
  4: { name: "James", age: 40 },
  length: 5,
};

var extracted = extractMany(users, function (user) {
  return user.age > 35;
});

console.log(extracted);
/*
   {
      0: { name: 'Pepito', age: 50 },
      1: { name: 'Campa', age: 30 },
      2: { name: 'James', age: 40 },
      length: 3
  }
  */

console.log(users);
/*
    {
        0: { name: 'Wendy', age: 19 },
        1: { name: 'Peter', age: 20 },
        length: 2
    }
  */
