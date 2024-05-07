// api/logic/technicalIndicatorsService.js

import {
  calculateRSI,
  calculateStochastic,
} from "../logic/technicalIndicators.js";
import TechnicalIndicatorOpportunity from "../models/TechnicalIndicatorOpportunityModel.js";
import {
  fetchHistoricalData,
  deleteOldSignals,
} from "../logic/technicalIndicatorDetector.js";

export async function detectTechnicalIndicatorsLogic() {
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
    const historicalData = await fetchHistoricalData(symbol);
    if (historicalData.length < 14) {
      console.error(`Insufficient data for calculation for ${symbol}.`);
      continue;
    }

    const highs = historicalData.map((data) => data.high);
    const lows = historicalData.map((data) => data.low);
    const closes = historicalData.map((data) => data.close);

    const rsiValues = calculateRSI(closes);
    const stochasticValues = calculateStochastic(highs, lows, closes);

    if (rsiValues <= 70 && stochasticValues.k <= 70) {
      const newOpportunity = new TechnicalIndicatorOpportunity({
        symbol,
        strategy: "RSI & Stochastic",
        message: "Purchase opportunity",
        rsi: rsiValues,
        stochastic: stochasticValues.k,
      });
      await newOpportunity.save();
      buySignals.push(newOpportunity);
    }
  }
  return buySignals;
}

export async function getOpportunitiesService() {
  return await TechnicalIndicatorOpportunity.find();
}
