// api/controllers/userController.js

const User = require("../models/User");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users: " + error.message });
  }
};

exports.createUser = async (req, res) => {
  const { nombre, correoElectronico, contraseña, configuracionesArbitraje } =
    req.body;

  try {
    // // Hash de la contraseña antes de guardarla en la base de datos
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(contraseña, salt);

    const user = new User({
      nombre,
      correoElectronico,
      contraseña, // Guarda la contraseña hasheada
      configuracionesArbitraje,
    });

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: "Error creating user: " + error.message });
  }
};

exports.loginUser = async (req, res) => {
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

exports.getUser = async (req, res) => {
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

exports.updateUser = async (req, res) => {
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

exports.deleteUser = async (req, res) => {
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
