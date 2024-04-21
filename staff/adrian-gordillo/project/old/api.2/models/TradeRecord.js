// api/models/TradeRecord.js

const mongoose = require("mongoose");

const tradeRecordSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  parCriptomonedas: { type: String, required: true },
  tipoOperacion: { type: String, required: true },
  precio: { type: Number, required: true },
  cantidad: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TradeRecord", tradeRecordSchema);
