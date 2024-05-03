// api/models/CryptoPrice.js
import mongoose from "mongoose";

const cryptoPriceSchema = new mongoose.Schema({
  pair: { type: String, required: true },
  price: { type: Number, required: true },
  exchange: { type: String, required: true }, // Agregar campo para el nombre del exchange
});

// Aseguramos la unicidad para cada par y exchange
cryptoPriceSchema.index({ pair: 1, exchange: 1 }, { unique: true });

export default mongoose.model("CryptoPrice", cryptoPriceSchema);
