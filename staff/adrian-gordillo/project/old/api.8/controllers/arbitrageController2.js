// api/controllers/arbitrageController2.js

import { detectTriangularArbitrage } from "../utils/arbitrageDetector2.js";

export const detectTriangular = async (req, res) => {
  try {
    const opportunities = await detectTriangularArbitrage();
    if (opportunities.length > 0 && opportunities[0].success) {
      res.json({ opportunities });
    } else {
      res
        .status(200)
        .json({
          message: "No se encontraron oportunidades de arbitraje triangular.",
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: `Error en la detección de arbitraje triangular: ${error.message}`,
      });
  }
};
