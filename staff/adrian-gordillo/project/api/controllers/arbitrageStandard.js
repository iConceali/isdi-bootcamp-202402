// api/controllers/arbitrageStandard.js

import * as arbitrageService from "../services/arbitrageStandardService.js";

export const detectStandard = async (req, res) => {
  try {
    const opportunities = await arbitrageService.detectArbitrage();
    if (opportunities.length > 0) {
      const response = { success: true, data: opportunities };
      if (res) res.status(200).json(response);
      return response;
    } else {
      const response = {
        success: false,
        message: "No se encontraron oportunidades de arbitraje standard.",
      };
      if (res) res.status(200).json(response);
      return response;
    }
  } catch (error) {
    console.error("Error detecting arbitrage opportunities: ", error);
    const response = {
      success: false,
      message: "Error during arbitrage detection: " + error.message,
    };
    if (res) res.status(500).json(response);
    return response;
  }
};
