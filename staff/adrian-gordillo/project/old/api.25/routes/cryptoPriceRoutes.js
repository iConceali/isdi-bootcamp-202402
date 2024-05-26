// api/routes/cryptoPriceRoutes.js

import express from "express";
import fetchCryptoPricesController from "../controllers/cryptoPrices/fetchCryptoPricesController";
import getCryptoByIdController from "../controllers/cryptoPrices/getCryptoByIdController";
const router = express.Router();

// Ruta para obtener todos los precios
router.get("/crypto-prices", fetchCryptoPricesController);

// Ruta para obtener una criptomoneda por su ID
router.get("/crypto/:id", getCryptoByIdController);

export default router;
