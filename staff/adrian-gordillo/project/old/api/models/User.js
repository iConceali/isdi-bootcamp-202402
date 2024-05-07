// api/models/User.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "The name is required"],
    validate: {
      validator: function (v) {
        return /^[a-zA-Z\s]+$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid name. It should only contain letters`,
    },
  },
  correoElectronico: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email already in use"],
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: (props) => `${props.value} It is not a valid email!`,
    },
  },
  contraseña: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "The password must be at least 8 characters"],
    validate: {
      validator: function (v) {
        return /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(v); // Verifica la presencia de al menos un número y una letra
      },
      message: "The password must contain at least one number and one letter",
    },
  },
  watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "CryptoPrice" }],
  deposit: [{ type: Number, min: 0 }], // Por ejemplo, aquí estamos estableciendo que el depósito debe ser un número positivo
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
