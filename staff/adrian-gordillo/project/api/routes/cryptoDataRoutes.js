// api/routes/cryptoDataRoutes.js

import express from "express";
import fetchCryptoDataController from "../controllers/cryptoData/fetchCryptoDataController";
import getCryptoByIdController from "../controllers/cryptoData/getCryptoByIdController";
const router = express.Router();

// Ruta para obtener todos los precios
router.get("/price-list", fetchCryptoDataController);

// Ruta para obtener una criptomoneda por su ID
router.get("/crypto/:id", getCryptoByIdController);

export default router;
