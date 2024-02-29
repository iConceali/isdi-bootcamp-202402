var Animal = require("./Animal");
var Pet = require("./Pet");
var Person = require("./Person");

function Dog(owner, name, birthdate, country, weight, size, breed, color) {
  Pet.call(this, owner, name, birthdate, country, weight);

  this.size = size;
  this.breed = breed;
  this.color = color;

  this.barking = false;
  this.energyLevel = 100;
  this.tricks = "";
}

Dog.prototype = Object.create(Pet.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
  this.barking = true;
};

Dog.prototype.performTrick = function (trick) {
  this.energyLevel -= 10;
  this.tricks = trick;
};

Dog.prototype.tsssh = function () {
  this.barking = false;
};

Pet.prototype.toString = function () {
  return (
    Pet.name +
    " (" +
    this.name +
    ", " +
    this.birthdate.toLocaleDateString("en-CA") +
    ")"
  );
};
module.exports = Dog;
/*
1.Sentarse (sit): El perro se sienta en sus patas traseras.
2.Echarse (lie down): El perro se acuesta en el suelo.
3.Dar la pata (shake hands): El perro levanta su pata para "dar la mano".
4.Hacerse el muerto (play dead): El perro se echa en el suelo y finge estar muerto.
5.Girar en círculos (spin): El perro da vueltas en círculos.
6.Buscar (fetch): El perro recoge y trae de vuelta un objeto arrojado.
7.Saltar (jump): El perro salta en el aire.
8.Dar besos (give kisses): El perro da lametones como muestra de afecto.
9.Hablar (speak): El perro ladra en respuesta a un comando.
10.Permanecer (stay): El perro se queda en su lugar hasta recibir la señal para moverse.
*/
