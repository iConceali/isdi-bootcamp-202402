function Button() {
  Component.call(this, "button");
}

Button.prototype = Object.create(Component.prototype);
Button.prototype.constructor = Button;

Button.prototype.setType = function (type) {
  if (typeof type !== "string") throw new TypeError("type is not a string");

  this._container.type = type;
};
