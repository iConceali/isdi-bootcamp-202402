// api/models/ArbitrageConfig.js

const mongoose = require("mongoose");

const arbitrageConfigSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  paresCriptomonedas: [{ type: String, required: true }],
  umbralRentabilidad: { type: Number, required: true },
  activo: { type: Boolean, default: true },
});

module.exports = mongoose.model("ArbitrageConfig", arbitrageConfigSchema);
