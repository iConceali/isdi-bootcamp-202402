delete Array.prototype.find;

function find(array, callback) {
  for (var i = 0; i < array.length; i++)
    if (callback(array[i])) return array[i];

  return undefined;
}

console.log("CASE 1: find first number greater thanb 10");

const array1 = [5, 1, 8, 3, 44];

const found = find(array1, (element) => element > 10);

// Expected output: 44

console.assert(found === 44, "44");

console.assert(array1[0] === 5, "5");
console.assert(array1[1] === 1, "1");
console.assert(array1[2] === 8, "8");
console.assert(array1[3] === 3, "3");
console.assert(array1[4] === 44, "44");
console.assert(array1.length === 5, "5");

console.log("CASE 2: find the first object that matches cherries");

const inventory = [
  { name: "apples", quantity: 2 },
  { name: "bananas", quantity: 0 },
  { name: "cherries", quantity: 5 },
];

var parm = find(inventory, ({ name }) => name === "cherries");
var other = [];

//console.log(parm); // { name: 'cherries', quantity: 5 }

console.assert(inventory[0].name === "apples", "apples");
console.assert(inventory[1].name === "bananas", "bananas");
console.assert(inventory[2].name === "cherries", "cherries");
console.assert(inventory[0].quantity === 2, 2);
console.assert(inventory[1].quantity === 0, 0);
console.assert(inventory[2].quantity === 5, 5);
console.assert(inventory.length === 3, 3);
