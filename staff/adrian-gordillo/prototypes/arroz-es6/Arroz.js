function Arroz() {
  if (arguments.length !== 1) {
    this.length = arguments.length;

    for (var i = 0; i < arguments.length; i++) {
      var argument = arguments[i];

      this[i] = argument;
    }
  } else {
    var argument = arguments[0];

    if (typeof argument === "number") {
      this.length = argument;

      return;
    }

    this[0] = argument;
    this.length = 1;
  }
}

Arroz.prototype.toString = function () {
  var string = "Arroz [";

  for (var i = 0; i < this.length; i++) {
    var element = this[i];

    string += element;

    if (i < this.length - 1) string += ", ";
  }

  string += "]";

  return string;
};

Arroz.prototype.push = function () {
  for (i = 0; i < arguments.length; i++) {
    var argument = arguments[i];

    this[this.length] = argument;
    this.length++;
  }

  return this.length;
};

Arroz.prototype.pop = function () {
  var lastIndex = this.length - 1;

  var last = this[lastIndex];

  delete this[lastIndex];

  this.length--;

  return last;
};

Arroz.prototype.at = function (index) {
  var element;

  if (index > -1) element = this[index];
  else {
    var newIndex = this.length + index;

    element = this[newIndex];
  }
  return element;
};

Arroz.prototype.concat = function () {
  var newArroz = [];

  for (var i = 0; i < this.length; i++) {
    var argument = this[i];

    newArroz[newArroz.length] = argument;
  }

  for (var i = 0; i < arguments.length; i++) {
    var argument = arguments[i];

    if (argument instanceof Arroz)
      for (var j = 0; j < argument.length; j++) {
        var element = argument[j];

        newArroz[newArroz.length] = element;
      }
    else newArroz[newArroz.length] = argument;
  }
  return newArroz;
};

Arroz.prototype.find = function (callback) {
  for (var i = 0; i < this.length; i++) {
    var element = this[i];
    if (callback(element)) return element;
  }
  return undefined;
};

Arroz.prototype.findIndex = function (callback) {
  for (var i = 0; i < this.length; i++) {
    if (callback(this[i])) return i;
  }
  return undefined;
};

Arroz.prototype.forEach = function (callback) {
  if (typeof callback !== "function")
    throw new TypeError(callback + " is not a function");

  for (var i = 0; i < this.length; i++) {
    var element = this[i];

    callback(element, i, this);
  }
};

Arroz.from = function (arroz) {
  var instance = new Arroz();

  for (var i = 0; i < arroz.length; i++) {
    var elem = arroz[i];

    instance[instance.length++] = elem;
  }

  return instance;
};

/*
Arroz.prototype.from = function (callback) {
  var returned = [];

  if (callback === undefined) {
    for (var i = 0; i < this.length; i++) {
      for (var j = 0; j < this[i].length; j++) {
        returned[returned.length] = this[i][j];
      }
    }
    return returned;
  } else {
    for (var i = 0; i < this.length; i++) {
      if (callback(this[i]) !== undefined) {
        returned[returned.length] = callback(this[i]);
      }
    }
  }
  return returned;
};
*/
Arroz.prototype.includes = function (valor, index) {
  if (index >= this.length) {
    return false;
  } else if ((index < 0 && this.length + index < 0) || index === undefined) {
    for (var i = 0; i < this.length; i++) {
      if (valor === this[i] || (isNaN(valor) && isNaN(this[i]))) {
        return true;
      }
    }
  } else if (index < 0 && this.length + index > 0) {
    for (var i = this.length + index; i < this.length; i++) {
      if (valor === this[i]) {
        return true;
      }
    }
  } else {
    for (var i = index; i < this.length; i++) {
      if (valor === this[i]) {
        return true;
      }
    }
  }
  return false;
};

Arroz.prototype.indexOf = function (valor, index) {
  if (index >= this.length) {
    return -1;
  } else if ((index < 0 && this.length + index < 0) || index === undefined) {
    for (var i = 0; i < this.length; i++) {
      if (valor === this[i]) {
        return i;
      }
    }
  } else if (index < 0 && this.length + index > 0) {
    for (var i = this.length + index; i < this.length; i++) {
      if (valor === this[i]) {
        return i;
      }
    }
  } else {
    for (var i = index; i < this.length; i++) {
      if (valor === this[i]) {
        return i;
      }
    }
  }
  return -1;
};

Arroz.prototype.join = function (separator) {
  let string = "";

  if (separator === undefined) separator = ",";
  for (var i = 0; i < this.length - 1; i++) {
    if (this[i] instanceof Arroz === false) string += this[i] + separator;
    else string += join(this[i]) + separator;
  }
  if (this[this.length - 1] instanceof Arroz === false)
    if (this.length === 0) string += "";
    else string += this[this.length - 1];
  else string += join(this[i]);
  return string;
};

Arroz.prototype.lastIndexOf = function (valor, index) {
  if (index >= this.length) {
    return -1;
  } else if ((index < 0 && this.length + index < 0) || index === undefined) {
    for (var i = this.length - 1; i >= 0; i--) {
      if (valor === this[i]) {
        return i;
      }
    }
  } else if (index < 0 && this.length + index > 0) {
    for (var i = this.length + index; i >= 0; i--) {
      if (valor === this[i]) {
        return i;
      }
    }
  } else {
    for (var i = index; i >= 0; i--) {
      if (valor === this[i]) {
        return i;
      }
    }
    if (valor === this[i] || (isNaN(valor) && isNaN(this[i]))) {
      return -1;
    }
  }
  return -1;
};

Arroz.prototype.map = function (callback) {
  var mapped = new Arroz();

  for (var i = 0; i < this.length; i++) {
    var elem = this[i];

    var mappedElement = callback(elem, i, this);

    mapped[mapped.length++] = mappedElement;
  }

  return mapped;
};

Arroz.prototype.reduce = function (callback, accum) {
  var i = 0;

  if (arguments.length === 1) {
    accum = this[0];

    i = 1;
  }

  for (; i < this.length; i++) {
    var elem = this[i];

    accum = callback(accum, elem);
  }

  return accum;
};

Arroz.prototype.shift = function () {
  var first = this[0];

  for (var i = 1; i < this.length; i++) {
    this[i - 1] = this[i];
  }

  this.length--;

  delete this[this.length];

  return first;
};

Arroz.prototype.slice = function (indexStart, indexEnd) {
  let result = [];

  if (indexStart === undefined || indexStart >= this.length) {
    indexStart = 0;
  } else if (indexStart < 0) {
    indexStart += this.length;
  }

  if (indexEnd === undefined || indexEnd >= this.length) {
    indexEnd = this.length;
  } else if (indexEnd < 0) {
    indexEnd += this.length;
  }

  for (let i = indexStart; i < indexEnd && i < this.length; i++) {
    result[result.length] = this[i];
  }
  return result;
};

Arroz.prototype.splice = function (start, deleteCount, item) {
  if (deleteCount === 0) {
    for (var i = this.length - 1; i > start - 1; i--) {
      var elem = this[i];

      this[i + 1] = elem;
    }
    this.length++;
    this[start] = item;

    return [];
  } else if (deleteCount === 1) {
    var removed = [];

    removed[removed.length] = this[start];

    this[start] = item;

    this.length++;

    return removed;
  } else if (deleteCount >= 2) {
    var removed = [];

    for (var i = 0; i < deleteCount; i++)
      removed[removed.length] = this[start + i];

    for (var i = 0; i < this.length - (start + deleteCount - 1); i++) {
      var elem = this[start + deleteCount + i];
      this[start + 1 + i] = elem;
    }

    this.length -= deleteCount - 1;

    this[start] = item;

    return removed;
  }
};

module.exports = Arroz;
