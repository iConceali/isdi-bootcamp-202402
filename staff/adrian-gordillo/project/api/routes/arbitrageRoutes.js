// api/routes/arbitrageRoutes.js

import express from "express";
import { detectStandard } from "../controllers/arbitrageStandardController.js";
import { detectTriangular } from "../controllers/arbitrageTriangularController.js";
import Opportunity from "../models/StandardAndTriangularOpportunityModel.js"; // Importa el modelo Mongoose

const router = express.Router();

router.get("/detect", detectStandard);
router.get("/triangular-detect", detectTriangular);
router.get("/opportunities", async (req, res) => {
  try {
    const opportunities = await Opportunity.find();
    res.json(opportunities);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching opportunities: " + error.message });
  }
});

export default router;
