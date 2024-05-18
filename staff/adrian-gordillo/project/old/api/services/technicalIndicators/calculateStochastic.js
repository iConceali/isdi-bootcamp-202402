// api/services/technicalIndicators/calculateStochastic.js

import { errors, validate } from "com";

const { ContentError, SystemError } = errors;

/**
 * Calculate the Stochastic Oscillator for a series of high, low, and closing prices
 */
const calculateStochastic = (highs, lows, closes) => {
  try {
    // Validar los arrays de precios
    if (
      !Array.isArray(highs) ||
      !Array.isArray(lows) ||
      !Array.isArray(closes) ||
      highs.length < 14 ||
      lows.length < 14 ||
      closes.length < 14
    ) {
      throw new ContentError("The price arrays are invalid or too short");
    }
    highs.forEach((high, index) =>
      validate.number(high, `high price at index ${index}`)
    );
    lows.forEach((low, index) =>
      validate.number(low, `low price at index ${index}`)
    );
    closes.forEach((close, index) =>
      validate.number(close, `close price at index ${index}`)
    );

    const kPeriod = 14;
    const dPeriod = 3;
    const kValues = [];

    for (let i = kPeriod; i <= highs.length; i++) {
      const highSlice = highs.slice(i - kPeriod, i);
      const lowSlice = lows.slice(i - kPeriod, i);
      const close = closes[i - 1];

      const highestHigh = Math.max(...highSlice);
      const lowestLow = Math.min(...lowSlice);

      const k = ((close - lowestLow) / (highestHigh - lowestLow)) * 100;
      kValues.push(k);
    }

    const dValues = kValues
      .slice(dPeriod - 1)
      .map(
        (_, index) =>
          kValues
            .slice(index, index + dPeriod)
            .reduce((acc, curr) => acc + curr, 0) / dPeriod
      );

    const kValue = parseFloat(kValues[kValues.length - 1].toFixed(2));
    const dValue = parseFloat(dValues[dValues.length - 1].toFixed(2));

    // Validar los valores calculados
    validate.number(kValue, "calculated Stochastic k value");
    validate.number(dValue, "calculated Stochastic d value");

    return {
      k: kValue,
      d: dValue,
    };
  } catch (error) {
    if (error instanceof ContentError) {
      console.error("Validation error:", error.message);
      throw error;
    } else {
      console.error("Error calculating Stochastic Oscillator:", error.message);
      throw new SystemError("Failed to calculate Stochastic Oscillator");
    }
  }
};

export default calculateStochastic;
