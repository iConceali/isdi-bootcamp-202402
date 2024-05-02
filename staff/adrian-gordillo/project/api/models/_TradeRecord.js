// api/models/TradeRecord.js

import mongoose from "mongoose";

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

export default mongoose.model("TradeRecord", tradeRecordSchema);
