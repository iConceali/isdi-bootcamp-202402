// api/routes/arbitrageRoutes.js

const express = require("express");
const router = express.Router();

const {
  getAllConfigs,
  createConfig,
  getConfig,
  updateConfig,
  deleteConfig,
  detectArbitrageAndNotify,
} = require("../controllers/arbitrageController");

router.get("/", getAllConfigs);
router.post("/", createConfig);
router.get("/:id", getConfig);
router.put("/:id", updateConfig);
router.delete("/:id", deleteConfig);
router.get("/detect", detectArbitrageAndNotify);

module.exports = router;
