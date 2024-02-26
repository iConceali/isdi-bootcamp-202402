var Car = require("./car");

console.log("TEST Car");

console.log("CASE constructor");

var car = new Car(
  "Ferrari",
  "Testarossa",
  1990,
  "red",
  3,
  "gasoline",
  "manual",
  6
);

console.assert(car.brand === "Ferrari", "brand is Ferrari");
console.assert(car.model === "Testarossa", "model is Testarossa");
console.assert(car.status === "off", "is off");
console.assert(car.deposit === 0, "desposit is 0");
console.assert(car.year === 1990, "year is 1990");
console.assert(car.color === "red", "color is red");
console.assert(car.doors === 3, "doors is 3");
console.assert(car.fuelType === "gasoline", "fuel type is gasoline");
console.assert(car.transmission === "manual", "transmission is manual");
console.assert(car.gears === 6, "gears is 6");

console.assert(car.gear === 0, "gear is 0");
console.assert(car.speed === 0, "speed is 0");
console.assert(car.acceleration === 0, "acceleration is 0");
console.assert(car.direction === "", "direction is empty");
console.assert(car.steering === 0, "steering is at 0");
// TODO 1
console.log("CASE 1: method fuel");

var car = new Car("Ford", "Fiesta", 1976, "grey", 5, "gasoline", "manual", 5);

car.fuel(80);

console.assert(car.deposit === 80, "desposit is at 80%");
//TODO 2
console.log("CASE 2: method start");

var car = new Car("Citroen", "CV", 1948, "red", 3, "gasoline", "manual", 3);

car.start();

console.assert(car.status === "on", "status is on");
// TODO 3
console.log("CASE 3: method stop");

var car = new Car("Citroen", "CV", 1948, "red", 3, "gasoline", "manual", 3);
car.status = "on";

car.stop();

console.assert(car.status === "off", "status is off");
// TODO 4
console.log("CASE 4: method changeGear");

var car = new Car("Citroen", "CV", 1948, "red", 3, "gasoline", "manual", 3);

car.changeGear(1);

console.assert(car.gear === 1, "gear is 1");

car.changeGear(2);

console.assert(car.gear === 2, "gear is 2");

try {
  car.changeGear(5);
} catch (error) {
  console.assert(error.name, "RangeError");
  console.assert(error.message, "gear greater than 3");
}

car.changeGear(-1);

console.assert(car.gear === -1, "gear is -1");
// TODO 5
console.log("CASE 5: method speedUp");

var car = new Car("Citroen", "CV", 1948, "red", 3, "gasoline", "manual", 3);

car.gear = 1;

car.speedUp(20);

console.assert(car.acceleration === 20, "acceleration is at 20");
console.assert(car.direction === "forward", "direction is forward");

car.gear = -1;

car.speedUp(100);

console.assert(car.acceleration === 100, "acceleration is at 100");
console.assert(car.direction === "backward", "direction is backward");
// TODO 6
console.log("CASE 6: method turnSteering");

var car = new Car("Citroen", "CV", 1948, "red", 3, "gasoline", "manual", 3);

car.gear = 1;
car.acceleration = 10;

car.changeSteering(20);

console.assert(car.acceleration === 10, "acceleration is at 10");
console.assert(car.steering === 20, "steering is at 20");
console.assert(
  car.direction === "forward-right",
  "direction is forward and right"
);

car.gear = -1;
car.acceleration = 10;

car.changeSteering(-30);

console.assert(car.acceleration === 10, "acceleration is at 10");
console.assert(car.steering === -30, "steering is at -30");
console.assert(
  car.direction === "backward-left",
  "direction is backward and left"
);
