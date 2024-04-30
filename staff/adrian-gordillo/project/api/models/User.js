// api/models/User.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    validate: {
      validator: function (v) {
        return /^[a-zA-Z\s]+$/.test(v); // Expresión regular que valida que solo contenga letras y espacios.
      },
      message: (props) =>
        `${props.value} no es un nombre válido. Solo debe contener letras.`,
    },
  },
  correoElectronico: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: (props) => `${props.value} no es un email válido!`,
    },
  },
  contraseña: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minlength: [8, "La contraseña debe tener al menos 8 caracteres"],
    validate: {
      validator: function (v) {
        return /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(v); // Verifica la presencia de al menos un número y una letra
      },
      message: "La contraseña debe contener al menos un número y una letra.",
    },
  },
  watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "CryptoPrice" }],
});

// Middleware para hashear la contraseña antes de guardar si se ha modificado
userSchema.pre("save", async function (next) {
  if (this.isModified("contraseña")) {
    const salt = await bcrypt.genSalt(10);
    this.contraseña = await bcrypt.hash(this.contraseña, salt);
  }
  next();
});

export default mongoose.model("User", userSchema);
