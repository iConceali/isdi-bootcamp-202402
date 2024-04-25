// api/routes/arbitrageRoutes.js

import express from "express";
const router = express.Router();

// Importa los controladores existentes
import {
  // getAllConfigs,
  // createConfig,
  // getConfig,
  // updateConfig,
  // deleteConfig,
  detectArbitrageAndNotify,
} from "../controllers/arbitrageController1.js";

// Importa el nuevo controlador de arbitraje triangular
import { detectTriangular } from "../controllers/arbitrageController2.js";

router.get("/detect", detectArbitrageAndNotify);
router.get("/triangular-detect", detectTriangular);

// router.get("/", getAllConfigs);
// router.post("/", createConfig);
// router.get("/:id", getConfig);
// router.put("/:id", updateConfig);
// router.delete("/:id", deleteConfig);

export default router;
