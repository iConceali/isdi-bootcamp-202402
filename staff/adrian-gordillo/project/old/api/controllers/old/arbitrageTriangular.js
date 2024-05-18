// api/controllers/arbitrageTriangular.js

import { runTriangularDetection } from "../services/arbitrageTriangularService.js";

export async function detectTriangular(req, res) {
  try {
    const opportunities = await runTriangularDetection();
    if (res) {
      // Verificar si `res` está definido
      res
        .status(200)
        .json({ message: "Detection complete", data: opportunities });
    }
  } catch (error) {
    console.error("Error handling request: ", error);
    if (res) {
      // Verificar si `res` está definido
      res.status(500).json({
        message: "Error handling the triangular arbitrage detection request.",
      });
    }
  }
}
