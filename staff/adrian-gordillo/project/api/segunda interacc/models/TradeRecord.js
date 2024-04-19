const mongoose = require("mongoose");

const tradeRecordSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  parCriptomonedas: String,
  tipoOperacion: String,
  precio: Number,
  cantidad: Number,
  fecha: Date,
});

module.exports = mongoose.model("TradeRecord", tradeRecordSchema);
