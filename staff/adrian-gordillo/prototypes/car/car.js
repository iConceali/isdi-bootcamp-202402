function Car(brand, model, year, color, doors, fuelType, transmission, gears) {
  this.brand = brand;
  this.model = model;
  this.status = "off";
  this.deposit = 0;
  this.year = year;
  this.color = color;
  this.doors = doors;
  this.fuelType = fuelType;
  this.transmission = transmission;
  this.gears = gears;

  this.gear = 0;
  this.speed = 0;
  this.acceleration = 0;
  this.direction = "";
  this.steering = 0;
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

Car.prototype.changeGear = function (gear) {
  this.gear = gear;
  if (this.gear > this.gears) throw new RangeError("gear greater than 3");
};

Car.prototype.speedUp = function (speed) {
  this.acceleration = speed;

  if (this.gear === -1) {
    this.direction = "backward";
  } else if (this.gear === 0) {
    this.direction = "";
  } else if (this.gear > 0) {
    this.direction = "forward";
  } else {
    throw new RangeError(`the gear ${gear} does no exist`);
  }
};

Car.prototype.changeSteering = function (steering) {
  this.steering = steering;
  if (this.steering > 0 && this.gear > 0 && this.acceleration > 0)
    this.direction = "forward-right";

  if (this.steering > 0 && this.gear === -1 && this.acceleration > 0)
    this.direction = "backward-right";

  if (this.steering < 0 && this.gear > 0 && this.acceleration > 0)
    this.direction = "forward-left";

  if (this.steering < 0 && this.gear === -1 && this.acceleration > 0)
    this.direction = "backward-left";
};

/*
Car.prototype.changeGear5 = function (gear) {
  this.gear = gear;
  if (this.gear > 5) throw new RangeError("gear greater than 5");
};
*/
module.exports = Car;
