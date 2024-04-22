// api/models/User.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correoElectronico: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  configuracionesArbitraje: [
    { type: mongoose.Schema.Types.ObjectId, ref: "ArbitrageConfig" },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("contraseña")) {
    const salt = await bcrypt.genSalt(10);
    this.contraseña = await bcrypt.hash(this.contraseña, salt);
  }
  next();
});

export default mongoose.model("User", userSchema);
