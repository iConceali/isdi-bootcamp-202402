// api/controllers/technicalIndicatorsController.js

import axios from "axios";
import {
  calculateRSI,
  calculateStochastic,
} from "../utils/technicalIndicators";

export const detectTechnicalIndicatorsLogic = async () => {
  // Renombrada la función aquí
  try {
    const symbol = "BTCUSDT";
    const interval = "1m";
    const limit = 500;
    const binanceApiUrl = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;

    const response = await axios.get(binanceApiUrl);
    const historicalData = response.data;

    const rsiValues = calculateRSI(historicalData);
    const stochasticValues = calculateStochastic(historicalData);

    const buySignals = [];
    const lastRSI = rsiValues[rsiValues.length - 1];
    const lastStochastic = stochasticValues[stochasticValues.length - 1].k;

    if (lastRSI <= 30 && lastStochastic <= 20) {
      buySignals.push({
        symbol: symbol,
        strategy: "RSI & Stochastic",
        message: `Oportunidad de compra detectada en ${symbol}. RSI: ${lastRSI}, Estocástico: ${lastStochastic}`,
      });
    }

    return buySignals;
  } catch (error) {
    console.error("Error en la detección de indicadores técnicos: ", error);
    throw error; // Throw the error to be handled elsewhere
  }
};
