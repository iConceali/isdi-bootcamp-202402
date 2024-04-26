// api/controllers/arbitrageController2.js

import { detectTriangularArbitrage } from "../utils/arbitrageDetector2.js";
import Opportunity from "../models/Opportunity";

export const detectTriangular = async (req, res) => {
  try {
    await Opportunity.deleteMany({ type: "triangular" });

    const opportunities = await detectTriangularArbitrage();
    if (opportunities.length > 0 && opportunities[0].success) {
      await Opportunity.insertMany(
        opportunities.map((op) => ({ ...op, type: "triangular" }))
      );
      if (res) {
        res.json({ opportunities });
      }
    } else {
      const message =
        "No se encontraron oportunidades de arbitraje triangular.";
      if (res) {
        res.status(200).json({ message });
      } else {
        console.log(message);
      }
    }
  } catch (error) {
    console.error("Error en la detección de arbitraje triangular: ", error);
    if (res) {
      res.status(500).json({
        message: `Error en la detección de arbitraje triangular: ${error.message}`,
      });
    }
  }
};
