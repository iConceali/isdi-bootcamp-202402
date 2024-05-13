// api/routes/arbitrageRoutes.js

import express from "express";
import { detectStandard } from "../controllers/arbitrageStandard.js";
import { detectTriangular } from "../controllers/arbitrageTriangular.js";
import { getOpportunities } from "../controllers/opportunityController.js";

const router = express.Router();

router.get("/detect", detectStandard);
router.get("/triangular-detect", detectTriangular);
router.get("/opportunities", getOpportunities);

export default router;
