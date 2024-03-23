function Input() {
  Component.call(this, "input");
}

Input.prototype = Object.create(Component.prototype);
Input.prototype.constructor = Input;

Input.prototype.setType = function (type) {
  if (typeof type !== "string") throw new TypeError("type is not a string");

  this._container.type = type;
};
