// api/controllers/userController.js

import User from "../models/User.js";
import CryptoPrice from "../models/CryptoPrice.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users: " + error.message });
  }
};

export const createUser = async (req, res) => {
  const { nombre, correoElectronico, contraseña } = req.body;

  try {
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(contraseña, salt);

    const user = new User({
      nombre,
      correoElectronico,
      contraseña, //hashedPassword, // Usar la contraseña hasheada
    });

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      res.status(400).json({ message: messages.join(", ") });
      console.log(messages.join(", "));
    } else if (error.code === 11000) {
      res.status(400).json({ message: "email already in use" });
    } else {
      res
        .status(500)
        .json({ message: "Error creating user: " + error.message });
    }
  }
};

export const loginUser = async (req, res) => {
  const { correoElectronico, contraseña } = req.body;

  try {
    const user = await User.findOne({
      correoElectronico: correoElectronico.trim(),
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(contraseña, user.contraseña);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // Asegúrate de incluir el _id en la respuesta
    res
      .status(200)
      .json({ token: token, user: { nombre: user.nombre, _id: user._id } });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during login process: " + error.message });
  }
};

// const getUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).populate(
//       "configuracionesArbitraje"
//     );
//     if (!user) {
//       return res.status(404).json({ message: "Cannot find user" });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const updateUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!user) {
//       return res.status(404).json({ message: "Cannot find user" });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// const deleteUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndRemove(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: "Cannot find user" });
//     }
//     res.json({ message: "User deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const getDeposit = async (req, res) => {
  try {
    const userId = req.user.id; // Asegúrate de que el middleware de autenticación está estableciendo req.user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Suponiendo que 'deposit' es un número y no un array en tu modelo de usuario
    res.status(200).json({ deposit: user.deposit });
  } catch (error) {
    console.error("Failed to fetch deposit:", error);
    res
      .status(500)
      .json({ message: `Failed to fetch deposit: ${error.message}` });
  }
};

export const updateDeposit = async (req, res) => {
  try {
    const userId = req.user.id; // Obtener el ID del usuario autenticado desde el middleware de autenticación
    const user = await User.findById(userId);
    if (!user) {
      console.error("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const newDeposit = req.body.deposit; // Obtener el nuevo depósito desde req.body.deposit
    user.deposit = newDeposit; // Actualizar el campo de depósito en el documento de usuario
    await user.save(); // Guardar los cambios en la base de datos

    res.status(200).json({ message: "Deposit updated successfully" });
  } catch (error) {
    console.error("Failed to update deposit:", error);
    res.status(500).json({ message: "Failed to update deposit" });
  }
};

//todo

// Función para agregar una criptomoneda a la watchlist del usuario
export async function addToWatchlist(req, res) {
  try {
    const user = await User.findById(req.params.id);
    const crypto = await CryptoPrice.findById(req.body.cryptoId);
    if (!user.watchlist.includes(crypto._id)) {
      user.watchlist.push(crypto._id);
      await user.save();
      res.status(200).send("Crypto added to watchlist");
    } else {
      res.status(400).send("Crypto already in watchlist");
    }
  } catch (error) {
    res.status(500).send("Error adding crypto to watchlist: " + error);
  }
}

// Función para obtener la watchlist del usuario
export async function getWatchlist(req, res) {
  try {
    const user = await User.findById(req.params.id).populate("watchlist");
    if (!user) {
      return res.status(404).send("User not found");
    }
    const watchlistIds = user.watchlist.map((crypto) => crypto._id);
    res.json(watchlistIds);
  } catch (error) {
    res.status(500).send("Error fetching user's watchlist: " + error);
  }
}

// Función para eliminar una criptomoneda de la watchlist del usuario
export async function removeFromWatchlist(req, res) {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { watchlist: req.params.cryptoId } },
      { new: true }
    );
    if (user) {
      res.status(200).send("Crypto removed from watchlist");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send("Error removing crypto from watchlist: " + error);
  }
}
