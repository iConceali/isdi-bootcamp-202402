// api/controllers/technicalIndicatorOpportunitiesController.js

import { detectTechnicalIndicatorsLogic } from "./technicalIndicatorsController";
import TechnicalIndicatorOpportunity from "../models/TechnicalIndicatorOpportunity";

// Controlador para detectar señales de compra
export async function detectTechnicalIndicators(req, res) {
  try {
    const buySignals = await detectTechnicalIndicatorsLogic();
    if (res) {
      // Verifica que res esté definido
      res.json({ buySignals });
    } else {
      console.log("No se encontraron oportunidades con indicadores técnicos.");
    }
  } catch (error) {
    console.error("Error en la detección de indicadores técnicos: ", error);
    if (res) {
      // Verifica que res esté definido
      res.status(500).json({
        message: `Error en la detección de indicadores técnicos: ${error.message}`,
      });
    } else {
      console.log(
        "Error en la detección de indicadores técnicos: ",
        error.message
      );
    }
  }
}

// Controlador para obtener todas las oportunidades
export async function getOpportunities(req, res) {
  try {
    const opportunities = await TechnicalIndicatorOpportunity.find();
    if (!Array.isArray(opportunities)) {
      console.error("Opportunities is not an array:", opportunities);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(opportunities);
  } catch (error) {
    console.error("Error al obtener las oportunidades técnicas: ", error);
    res
      .status(500)
      .json({ message: "Error al obtener las oportunidades técnicas" });
  }
}
