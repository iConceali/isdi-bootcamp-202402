const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correoElectronico: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  configuracionesArbitraje: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ArbitrageConfig",
  },
});

module.exports = mongoose.model("User", userSchema);
