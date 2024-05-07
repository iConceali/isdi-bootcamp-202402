// api/controllers/technicalIndicatorOpportunitiesController.js

import {
  detectTechnicalIndicatorsLogic,
  getOpportunitiesService,
} from "../logic/technicalIndicatorsService.js";

export async function detectTechnicalIndicators(req, res) {
  try {
    const buySignals = await detectTechnicalIndicatorsLogic();
    if (res) {
      // Verifica que 'res' esté definido antes de usarlo
      res.status(200).json({ buySignals });
    }
  } catch (error) {
    console.error("Error en la detección de indicadores técnicos: ", error);
    if (res) {
      // Verifica que 'res' esté definido antes de usarlo
      res.status(500).json({
        message: `Error en la detección de indicadores técnicos: ${error.message}`,
      });
    }
  }
}

export async function getOpportunities(req, res) {
  try {
    const opportunities = await getOpportunitiesService();
    res.status(200).json(opportunities);
  } catch (error) {
    console.error("Error al obtener las oportunidades técnicas: ", error);
    res
      .status(500)
      .json({ message: "Error al obtener las oportunidades técnicas" });
  }
}
