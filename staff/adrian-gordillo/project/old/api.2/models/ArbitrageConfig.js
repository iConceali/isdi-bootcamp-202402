// api/models/ArbitrageConfig.js

const mongoose = require("mongoose");

const arbitrageConfigSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  intervaloActualización: { type: Number, required: true },
  paresCriptomonedas: [{ type: String, required: true }],
  umbralRentabilidad: { type: Number, required: true },
  estrategiaArbitraje: { type: String, required: true },
});

module.exports = mongoose.model("ArbitrageConfig", arbitrageConfigSchema);
