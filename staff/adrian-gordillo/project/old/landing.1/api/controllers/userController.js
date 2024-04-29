// api/controllers/userController.js

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users: " + error.message });
  }
};

const createUser = async (req, res) => {
  const { nombre, correoElectronico, contraseña } = req.body;

  try {
    const user = new User({
      nombre,
      correoElectronico,
      contraseña,
    });

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      res.status(400).json({ message: messages.join(", ") });
    } else {
      res
        .status(500)
        .json({ message: "Error creating user: " + error.message });
    }
  }
};

const loginUser = async (req, res) => {
  const { correoElectronico, contraseña } = req.body;

  // console.log("Datos recibidos para login:", req.body);

  try {
    const user = await User.findOne({
      correoElectronico: correoElectronico.trim(),
    });
    if (!user) {
      // console.log("Usuario no encontrado con correo:", correoElectronico);
      return res.status(404).json({ message: "User not found" });
    }

    // console.log("Usuario encontrado:", user.nombre);
    // console.log("Contraseña ingresada (pre-compare):", contraseña);
    // console.log("Contraseña hasheada almacenada:", user.contraseña);

    const validPassword = await bcrypt.compare(contraseña, user.contraseña);
    // console.log("Resultado de comparación de contraseña:", validPassword);

    if (!validPassword) {
      // console.log("Contraseña inválida para usuario:", user.nombre);
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // console.log("Token generado para usuario:", user.nombre);
    res.json({ token: token, nombre: user.nombre });
  } catch (error) {
    // console.error("Error en el login:", error);
    res
      .status(500)
      .json({ message: "Error during login process: " + error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "configuracionesArbitraje"
    );
    if (!user) {
      return res.status(404).json({ message: "Cannot find user" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "Cannot find user" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Cannot find user" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllUsers, createUser, loginUser, getUser, updateUser, deleteUser };
