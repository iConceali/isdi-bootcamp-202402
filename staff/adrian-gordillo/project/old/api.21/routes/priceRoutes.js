// api/routes/priceRoutes.js

import express from "express";
const router = express.Router();
import {
  updateCryptoPrices,
  getCryptoById,
} from "../controllers/priceController.js";

// Ruta para obtener todos los precios
router.get("/crypto-prices", updateCryptoPrices);

// Ruta para obtener una criptomoneda por su ID
router.get("/crypto/:id", getCryptoById); // Asegúrate de que el nombre del parámetro coincide con el usado en el controlador

export default router;
