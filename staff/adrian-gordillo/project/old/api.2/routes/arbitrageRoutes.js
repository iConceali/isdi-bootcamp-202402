// api/routes/arbitrageRoutes.js

const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const {
  getAllConfigs,
  createConfig,
  getConfig,
  updateConfig,
  deleteConfig,
} = require("../controllers/arbitrageController");

router.get("/", authenticate, getAllConfigs); // Solo usuarios autenticados
router.post("/", authenticate, createConfig); // Solo usuarios autenticados
router.get("/:id", authenticate, getConfig); // Solo usuarios autenticados
router.put("/:id", authenticate, updateConfig); // Solo usuarios autenticados
router.delete("/:id", authenticate, deleteConfig); // Solo usuarios autenticados

module.exports = router;
