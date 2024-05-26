// api/routes/arbitrageRoutes.js

import express from "express";
import detectStandardArbitrageController from "../controllers/arbitrage/detectStandardArbitrageController.js";
import detectTriangularArbitrageController from "../controllers/arbitrage/detectTriangularArbitrageController.js";
import getArbitrageOpportunitiesController from "../controllers/arbitrage/getArbitrageOpportunitiesController.js";

const router = express.Router();

router.get("/detect", detectStandardArbitrageController);
router.get("/triangular-detect", detectTriangularArbitrageController);
router.get("/opportunities", getArbitrageOpportunitiesController);

export default router;
