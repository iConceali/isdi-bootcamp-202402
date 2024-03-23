function Component(tagName) {
  this._container = document.createElement(tagName);
}

Component.prototype.setText = function (text) {
  this._container.innerText = text;
};

Component.prototype.add = function () {
  var children = arguments;

  Array.prototype.forEach.call(children, function (child) {
    if (!(child instanceof Component))
      throw new TypeError("child is not a Component");
  });

  Array.prototype.forEach.call(
    children,
    function (child) {
      this._container.appendChild(child._container);
    }.bind(this)
  );
};

Component.prototype.assembleTo = function (element) {
  if (!(element instanceof HTMLElement))
    throw new TypeError("element is not an HTMLElement");

  element.appendChild(this._container);
};

Component.prototype.onClick = function (callback) {
  this._container.onclick = callback;
};

Component.prototype.setId = function (id) {
  if (typeof id !== "string") throw new TypeError("id is not a string");

  this._container.id = id;
};

Component.prototype.setClass = function (className) {
  if (typeof className !== "string")
    throw new TypeError("className is not a string");

  this._container.className = className;
};
