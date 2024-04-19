const mongoose = require("mongoose");

const cryptoPriceSchema = new mongoose.Schema({
  parCriptomonedas: String,
  precio: Number,
  fecha: Date,
});

module.exports = mongoose.model("CryptoPrice", cryptoPriceSchema);
