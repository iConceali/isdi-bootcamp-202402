// api/controllers/technicalIndicatorsController.js

import axios from "axios";
import {
  calculateRSI,
  calculateStochastic,
} from "../utils/technicalIndicators";
import TechnicalIndicatorOpportunity from "../models/TechnicalIndicatorOpportunity";

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

export const fetchHistoricalData = async (symbol) => {
  const interval = "1m";
  const limit = 500;
  const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;

  try {
    const response = await axios.get(url);
    return response.data.map((kline) => ({
      open: parseFloat(kline[1]),
      high: parseFloat(kline[2]),
      low: parseFloat(kline[3]),
      close: parseFloat(kline[4]),
      volume: parseFloat(kline[5]),
    }));
  } catch (error) {
    console.error(`Error fetching historical data for ${symbol}: `, error);
    return [];
  }
};

export const deleteOldSignals = async () => {
  try {
    await TechnicalIndicatorOpportunity.deleteMany({});
    console.log("Cleared old buy signals.");
  } catch (error) {
    console.error("Error clearing old buy signals: ", error);
  }
};

export const detectTechnicalIndicatorsLogic = async () => {
  await deleteOldSignals();
  let buySignals = [];

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

    // console.log(`Analyzed symbol: ${symbol}`);
    // console.log(`Latest RSI Value for ${symbol}: ${rsiValues}`); // Assuming rsiValues is a single value
    // console.log(
    //   `Latest Stochastic Values for ${symbol}: K=${stochasticValues.k}, D=${stochasticValues.d}`
    // );

    if (rsiValues <= 70 && stochasticValues.k <= 70) {
      try {
        const newOpportunity = new TechnicalIndicatorOpportunity({
          symbol,
          strategy: "RSI & Stochastic",
          message: `Purchase opportunity`,
          rsi: `${rsiValues}`,
          stochastic: `${stochasticValues.k}`,
        });
        await newOpportunity.save();
        buySignals.push(newOpportunity);
        console.log(`Saved buy signal for ${symbol}`);
      } catch (dbError) {
        console.error(`Error saving buy signal for ${symbol}: `, dbError);
      }
    }
  }

  return buySignals;
};
