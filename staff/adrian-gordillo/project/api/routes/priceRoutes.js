// api/routes/priceRoutes.js
import express from "express";
const router = express.Router();
import updateCryptoPrices from "../controllers/priceController.js";

// Asociar controlador a la ruta específica
router.get("/crypto-prices", updateCryptoPrices);

export default router;
