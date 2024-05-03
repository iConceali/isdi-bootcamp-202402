// routes/technicalIndicatorOpportunities.js

import express from "express";
import {
  detectTechnicalIndicators,
  getOpportunities,
} from "../controllers/technicalIndicatorOpportunitiesController";

const router = express.Router();

router.get("/detect-technical", detectTechnicalIndicators);
router.get("/", getOpportunities);

export default router;
