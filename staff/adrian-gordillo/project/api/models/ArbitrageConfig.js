// api/models/ArbitrageConfig.js

import mongoose from "mongoose";

const arbitrageConfigSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  paresCriptomonedas: [{ type: String, required: true }],
  umbralRentabilidad: { type: Number, required: true },
  activo: { type: Boolean, default: true },
});

export default mongoose.model("ArbitrageConfig", arbitrageConfigSchema);
