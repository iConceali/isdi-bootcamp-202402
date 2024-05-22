// api/services/technicalIndicators/calculateRSI.js

import { errors, validate } from "com";

const { ContentError, SystemError } = errors;

/**
 * Calculate the Relative Strength Index (RSI) for a series of closing prices
 */
const calculateRSI = (closes, period = 14) => {
  // Validar el array de precios de cierre
  if (!Array.isArray(closes) || closes.length < period) {
    throw new ContentError("The closes array is invalid or too short");
  }
  closes.forEach((close, index) => {
    if (typeof close !== "number") {
      throw new ContentError(`close price at index ${index} is not a number`);
    }
  });

  // Validar el periodo
  if (typeof period !== "number") {
    throw new ContentError("period is not a number");
  }

  try {
    let gains = 0;
    let losses = 0;
    let rsis = [];

    for (let i = 1; i <= period; i++) {
      const diff = closes[i] - closes[i - 1];
      if (diff > 0) gains += diff;
      else losses -= diff;
    }

    let avgGain = gains / period;
    let avgLoss = losses / period;
    let rs = avgGain / avgLoss;
    rsis.push(100 - 100 / (1 + rs));

    for (let i = period + 1; i < closes.length; i++) {
      const change = closes[i] - closes[i - 1];
      let gain = change > 0 ? change : 0;
      let loss = change < 0 ? -change : 0;

      avgGain = (avgGain * (period - 1) + gain) / period;
      avgLoss = (avgLoss * (period - 1) + loss) / period;

      rs = avgGain / avgLoss;
      rsis.push(100 - 100 / (1 + rs));
    }

    const result = parseFloat(rsis[rsis.length - 1].toFixed(2));
    validate.number(result, "calculated RSI");
    return result;
  } catch (error) {
    console.error("Error calculating RSI:", error.message);
    throw new SystemError("Failed to calculate RSI");
  }
};

export default calculateRSI;
