const mongoose = require("mongoose");

const arbitrageConfigSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  intervaloActualización: Number,
  paresCriptomonedas: [String],
  umbralRentabilidad: Number,
  estrategiaArbitraje: String,
});

module.exports = mongoose.model("ArbitrageConfig", arbitrageConfigSchema);
