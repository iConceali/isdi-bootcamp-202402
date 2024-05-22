// api/services/technicalIndicators/detectTechnicalIndicators.js

import TechnicalOpportunity from "../../models/TechnicalOpportunityModel.js";
import fetchHistoricalData from "./fetchHistoricalData.js";
import deleteOldSignals from "./deleteOldSignals.js";
import calculateRSI from "./calculateRSI.js";
import calculateStochastic from "./calculateStochastic.js";
import { errors, validate } from "com";

const { SystemError, ContentError } = errors;

/**
 * Lógica para detectar indicadores técnicos
 */
const detectTechnicalIndicators = async () => {
  try {
    await deleteOldSignals();
    let buySignals = [];

    const symbols = [
      "BTCUSDT",
      "ETHUSDT",
      "DOTUSDT",
      "BNBUSDT",
      "SOLUSDT",
      "XRPUSDT",
      "ADAUSDT",
      "DOGEUSDT",
      "AVAXUSDT",
      "TRXUSDT",
      "BCHUSDT",
      "LINKUSDT",
      "NEARUSDT",
      "MATICUSDT",
      "LTCUSDT",
    ];

    for (const symbol of symbols) {
      try {
        // Validar símbolo
        validate.text(symbol, "symbol");

        const historicalData = await fetchHistoricalData(symbol);
        if (historicalData.length < 14) {
          console.error(`Insufficient data for calculation for ${symbol}.`);
          continue;
        }

        const highs = historicalData.map((data) => data.high);
        const lows = historicalData.map((data) => data.low);
        const closes = historicalData.map((data) => data.close);

        const rsiValue = parseFloat(calculateRSI(closes));
        const stochasticValues = calculateStochastic(highs, lows, closes);

        // Validar RSI y Stochastic
        validate.number(rsiValue, "RSI value");
        validate.number(parseFloat(stochasticValues.k), "Stochastic k value");

        if (rsiValue <= 70 && parseFloat(stochasticValues.k) <= 70) {
          const newOpportunity = new TechnicalOpportunity({
            symbol,
            strategy: "RSI & Stochastic",
            message: "Purchase opportunity",
            rsi: rsiValue,
            stochastic: parseFloat(stochasticValues.k),
          });
          await newOpportunity.save();
          buySignals.push(newOpportunity);
        }
      } catch (validationError) {
        console.error(
          `Validation error for ${symbol}: ${validationError.message}`
        );
        throw new ContentError(
          `Validation error for ${symbol}: ${validationError.message}`
        );
      }
    }
    return buySignals;
  } catch (error) {
    if (error instanceof ContentError) {
      console.error("Validation error:", error.message);
      throw error;
    } else {
      console.error("Error detecting technical indicators:", error.message);
      throw new SystemError("Failed to detect technical indicators");
    }
  }
};

export default detectTechnicalIndicators;
