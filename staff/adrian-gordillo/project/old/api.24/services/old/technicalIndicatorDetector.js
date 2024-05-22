// api/services/technicalIndicatorDetector.js

import axios from "axios";
import TechnicalOpportunity from "../models/TechnicalOpportunityModel.js";

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
    console.error(`Error fetching historical data for ${symbol}: ${error}`);
    return [];
  }
};

export const deleteOldSignals = async () => {
  try {
    await TechnicalOpportunity.deleteMany({});
    console.log("Cleared old buy signals.");
  } catch (error) {
    console.error("Error clearing old buy signals: ", error);
  }
};
