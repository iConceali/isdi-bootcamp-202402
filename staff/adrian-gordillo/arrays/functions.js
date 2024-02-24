function copyArray(array) {
  var arrCopy = [];
  var stringCopy = "";

  if (array instanceof Array) {
    for (var i = 0; i < array.length; i++) {
      arrCopy[arrCopy.length] = array[i];
    }
    return arrCopy;
  } else {
    for (var i = 0; i < array.length; i++) {
      stringCopy = array;
    }
    return stringCopy;
  }
}

function conAssert(arrOriginal, arrCopy, result, expectedValue) {
  //comprobamos si el array original no ha sido modificado
  for (var i = 0; i < arrOriginal.length; i++) {
    console.assert(arrOriginal[i] === arrCopy[i], arrCopy[i]);
  }

  // Comprobamos que la función principal devuelve el resultado que esperamos
  if (expectedValue !== undefined) {
    console.assert(
      expectedValue.toString() === result.toString(),
      "El resultado del callback no es el esperado"
    );
  }
}

module.exports = {
  copyArray: copyArray,
  conAssert: conAssert,
};
