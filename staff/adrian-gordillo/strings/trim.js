delete String.prototype.trim;

//--Código de Pere, a mi no se me ocurrió esta logica--//

function trim(string) {
  let newStr = "";
  let backwardsStr = "";
  let condition = false; //change var
  // delete var
  for (let i = string.length - 1; i >= 0; i--) {
    if (
      string[i] === " " ||
      string[i] === "\n" ||
      string[i] === "s" ||
      string[i] === "\r"
    ) {
      if (condition === true) {
        backwardsStr = backwardsStr + string[i];
      }
    } else {
      condition = true;
      backwardsStr = backwardsStr + string[i];
    }
  }

  condition = false; // add var

  for (let i = backwardsStr.length - 1; i >= 0; i--) {
    if (
      backwardsStr[i] === " " ||
      backwardsStr[i] === "\n" ||
      backwardsStr[i] === "s" ||
      backwardsStr[i] === "\r"
    ) {
      if (condition === true) {
        newStr = newStr + backwardsStr[i];
      }
    } else {
      condition = true;
      newStr = newStr + backwardsStr[i];
    }
  }
  return newStr;
}

// CASE 1

var s = "  hola mundo   ";

var result = trim(s);

console.log(result);
// 'hola mundo'

// CASE 2

var s = " \ns\r hola mundo \ns\r ";

var result = trim(s);

console.log(result);
// 'hola mundo'
