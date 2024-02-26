function Car(brand, model) {
  this.brand = brand;
  this.model = model;
  this.status = "off";
  this.deposit = 0;
}

Car.prototype.fuel = function (load) {
  this.deposit = load;
};

Car.prototype.start = function () {
  this.status = "on";
};

Car.prototype.stop = function () {
  this.status = "off";
};

module.exports = Car;
