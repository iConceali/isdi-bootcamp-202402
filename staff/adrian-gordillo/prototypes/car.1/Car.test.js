var Car = require("./car");

console.log("TEST Car");

console.log("CASE constructor");

var car = new Car("Ferrari", "Testarossa");

console.assert(car.brand === "Ferrari", "c1 brand is Ferrari");
console.assert(car.model === "Testarossa", "c1 model is Testarossa");
console.assert(car.status === "off", "c1 is off");
console.assert(car.deposit === 0, "c1 desposit is 0");

console.log("CASE method fuel");

var car = new Car("Ford", "Fiesta");

car.fuel(80);

console.assert(car.deposit === 80, "c1 desposit is at 80%");

console.log("CASE method start");

var car = new Car("Citroen", "CV");

car.start();

console.assert(car.status === "on", "c1 status is on");

console.log("CASE method stop");

var car = new Car("Citroen", "CV");
car.status = "on";

car.stop();

console.assert(car.status === "off", "c1 status is off");
