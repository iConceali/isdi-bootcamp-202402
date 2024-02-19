delete Array.prototype.find;

function find(array, callback) {
  for (var i = 0; i < array.length; i++) {
    if (callback(array[i])) return array[i];
  }
  return undefined;
}

console.log("CASE 1");

const array1 = [5, 1, 8, 3, 44];

const found = find(array1, (element) => element > 100);

console.log(found);
// Expected output: 12

console.log("CASE 2");

const inventory = [
  { name: "apples", quantity: 2 },
  { name: "bananas", quantity: 0 },
  { name: "cherries", quantity: 5 },
];

const parm = find(inventory, ({ name }) => name === "cherries");

console.log(parm); // { name: 'cherries', quantity: 5 }
