delete Array.prototype.every;

function every(array, callback) {
  var result;
  for (var i = 0; i < array.length; i++) {
    if (callback(array[i]) || array[i] === undefined) result = true;
    else result = false;
  }
  return result;
}

const isBelowThreshold = (currentValue) => currentValue < 4;

const array1 = [];

console.log(every(array1, isBelowThreshold));
// Expected output: true

/*
delete Array.prototype.every

function some(array, callback) {
    
    for (var i = 0; i < array.length; i++) {
     if (callback(array[i])) return false
            
    } 
  return true
}
*/
