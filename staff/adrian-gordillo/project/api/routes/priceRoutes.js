// api/routes/priceRoutes.js
import express from "express";
const router = express.Router();
import getCryptoPrices from "../controllers/priceController.js";

// Asociar controlador a la ruta específica
router.get("/crypto-prices", getCryptoPrices);

export default router;
