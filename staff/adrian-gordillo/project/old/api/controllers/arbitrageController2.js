// api/controllers/arbitrageController2.js

import { detectTriangularArbitrage } from "../utils/arbitrageDetector2.js";
import Opportunity from "../models/Opportunity.js";

export async function detectTriangular(req, res) {
  try {
    await runTriangularDetection();
    if (res) {
      // Solo intenta enviar una respuesta si `res` está definido
      res.status(200).json({ message: "Detection complete" });
    }
  } catch (error) {
    console.error("Error handling request: ", error);
    if (res) {
      res.status(500).json({
        message: "Error handling the triangular arbitrage detection request.",
      });
    }
  }
}

export async function runTriangularDetection() {
  try {
    await Opportunity.deleteMany({ type: "triangular" });
    console.log("Cleared old triangular arbitrage opportunities.");

    const opportunities = await detectTriangularArbitrage();
    if (opportunities.length > 0 && opportunities[0].success) {
      await Opportunity.insertMany(
        opportunities.map((op) => ({ ...op, type: "triangular" }))
      );
      console.log("Triangular arbitrage opportunities detected and stored.");
    } else {
      console.log("No triangular arbitrage opportunities found.");
    }
  } catch (error) {
    console.error("Error in detecting triangular arbitrage: ", error);
  }
}
