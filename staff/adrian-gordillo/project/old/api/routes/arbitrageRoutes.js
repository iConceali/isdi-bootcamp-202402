// api/routes/arbitrageRoutes.js

import express from "express";
const router = express.Router();

import {
  getAllConfigs,
  createConfig,
  getConfig,
  updateConfig,
  deleteConfig,
  detectArbitrageAndNotify,
} from "../controllers/arbitrageController.js";

router.get("/detect", detectArbitrageAndNotify);

router.get("/", getAllConfigs);
router.post("/", createConfig);
router.get("/:id", getConfig);
router.put("/:id", updateConfig);
router.delete("/:id", deleteConfig);

export default router;
