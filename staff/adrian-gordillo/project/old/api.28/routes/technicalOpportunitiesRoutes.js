// api/routes/technicalOpportunities.js

import express from "express";

import getTechnicalController from "../controllers/technicalOpportunities/getTechnicaController";
import detectTechnicalController from "../controllers/technicalOpportunities/detectTechnicalController";

const router = express.Router();

router.get("/detect-technical", detectTechnicalController);
router.get("/technical-opportunities", getTechnicalController);

export default router;
