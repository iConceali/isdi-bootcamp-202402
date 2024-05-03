// utils/technicalIndicators.js

import { RSI, Stochastic } from "technicalindicators";

export const calculateRSI = (historicalData) => {
  const closes = historicalData.map((data) => parseFloat(data[4]));
  const inputRSI = {
    values: closes,
    period: 14,
  };
  const rsiValues = RSI.calculate(inputRSI);
  return rsiValues;
};

export const calculateStochastic = (historicalData) => {
  const highs = historicalData.map((data) => parseFloat(data[2]));
  const lows = historicalData.map((data) => parseFloat(data[3]));
  const closes = historicalData.map((data) => parseFloat(data[4]));

  const inputStochastic = {
    high: highs,
    low: lows,
    close: closes,
    period: 14,
    signalPeriod: 3,
  };
  const stochasticValues = Stochastic.calculate(inputStochastic);
  return stochasticValues;
};
