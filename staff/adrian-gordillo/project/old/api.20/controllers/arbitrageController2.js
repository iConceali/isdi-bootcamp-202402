// api/controllers/arbitrageController2.js

import { detectTriangularArbitrage } from "../utils/arbitrageDetector2.js";
import Opportunity from "../models/Opportunity.js";

export async function detectTriangular(req, res) {
  try {
    // Clear previous signals before detecting new ones
    await Opportunity.deleteMany({ type: "triangular" });
    console.log("Cleared old triangular arbitrage opportunities.");

    const opportunities = await detectTriangularArbitrage();
    if (opportunities.length > 0 && opportunities[0].success) {
      await Opportunity.insertMany(
        opportunities.map((op) => ({ ...op, type: "triangular" }))
      );
      res.status(200).json({ opportunities });
    } else {
      const message =
        "No se encontraron oportunidades de arbitraje triangular.";
      console.log(message);
      res.status(200).json({ message });
    }
  } catch (error) {
    console.error("Error en la detección de arbitraje triangular: ", error);
    res.status(500).json({
      message: `Error en la detección de arbitraje triangular: ${error.message}`,
    });
  }
}
