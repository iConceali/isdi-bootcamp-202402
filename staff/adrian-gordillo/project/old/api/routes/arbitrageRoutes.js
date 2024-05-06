// api/routes/arbitrageRoutes.js

import express from "express";
import { detectArbitrageAndNotify } from "../controllers/arbitrageController1.js";
import { detectTriangular } from "../controllers/arbitrageController2.js";
import Opportunity from "../models/Opportunity"; // Importa el modelo Mongoose

const router = express.Router();

router.get("/detect", detectArbitrageAndNotify);
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
