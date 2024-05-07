// api/routes/userRoutes.js

import { Router } from "express";
import authenticate from "../middleware/auth.js";
import {
  getAllUsers,
  createUser,
  loginUser,
  getDeposit,
  updateDeposit,
} from "../controllers/userController.js";

import User from "../models/User.js";
import CryptoPrice from "../models/CryptoPrice.js";

const router = Router();

router.get("/", authenticate, getAllUsers); // Solo usuarios autenticados
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/deposit", authenticate, getDeposit); // Ruta para actualizar el depósito
router.put("/deposit", authenticate, updateDeposit); // Ruta para actualizar el depósito
// router.get("/:id", authenticate, getUser); // Solo usuarios autenticados
// router.put("/:id", authenticate, updateUser); // Solo usuarios autenticados
// router.delete("/:id", authenticate, deleteUser); // Solo usuarios autenticados

// Agregar una criptomoneda a la watchlist del usuario
router.post("/:id/watchlist", authenticate, async (req, res) => {
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
});

// Obtener la watchlist del usuario
router.get("/:id/watchlist", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("watchlist");
    if (!user) {
      return res.status(404).send("User not found");
    }
    // Asumiendo que quieres devolver los IDs de las criptos en la watchlist
    const watchlistIds = user.watchlist.map((crypto) => crypto._id);
    res.json(watchlistIds);
  } catch (error) {
    res.status(500).send("Error fetching user's watchlist: " + error);
  }
});

// Eliminar una criptomoneda de la watchlist del usuario
router.delete("/:id/watchlist/:cryptoId", authenticate, async (req, res) => {
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
});

export default router;
