const express = require("express");
const router = express.Router();
const {
  getAllConfigs,
  createConfig,
  getConfig,
  updateConfig,
  deleteConfig,
} = require("../controllers/arbitrageController");

router.get("/", getAllConfigs);
router.post("/", createConfig);
router.get("/:id", getConfig);
router.put("/:id", updateConfig);
router.delete("/:id", deleteConfig);

module.exports = router;
