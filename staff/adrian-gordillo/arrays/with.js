delete Array.prototype.with;

function newWith(array, index, element) {
  var newArr = [];

  for (var i = 0; i < index; i++) {
    newArr[i] = array[i];
  }
  newArr[index] = element;

  for (var i = index + 1; i < array.length; i++) {
    newArr[newArr.length] = array[i];
  }

  return newArr;
}

const nums = [1, 2, 3, 4, 5];
console.log(newWith(nums, 2, 6)); // [1, 2, 6, 4, 5]
console.log(nums); // [1, 2, 3, 4, 5]
