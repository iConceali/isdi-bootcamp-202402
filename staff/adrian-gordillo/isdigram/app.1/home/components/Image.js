function Image() {
  Component.call(this, "img");
}

Image.prototype = Object.create(Component.prototype);
Image.prototype.constructor = Image;

Image.prototype.setSource = function (source) {
  if (typeof source !== "string") throw new TypeError("source is not a string");

  this._container.src = source;
};
