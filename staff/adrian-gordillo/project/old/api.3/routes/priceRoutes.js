// api/routes/priceRoutes.js
const express = require("express");
const router = express.Router();
const priceController = require("../controllers/priceController");

// Asociar controlador a la ruta específica
router.get("/crypto-prices", priceController.getCryptoPrices);

module.exports = router;
