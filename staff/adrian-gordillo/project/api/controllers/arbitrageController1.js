// api/controllers/arbitrageController1.js

import { detectArbitrageOpportunities } from "../utils/arbitrageDetector1.js";
import Opportunity from "../models/Opportunity";

export const detectArbitrageAndNotify = async (req, res) => {
  const config = {
    umbralRentabilidad: 0.1,
    comisiones: {
      Binance: 0.1,
      Kraken: 0.21,
      Coinbase: 0.5,
      Bitfinex: 0.15,
      "Crypto.com": 0.4,
      "Gate.io": 0.2,
      KuCoin: 0.1,
    },
    paresCriptomonedas: [
      "BTC/USDT",
      "ETH/USDT",
      "LTC/USDT",
      "ADA/USDT",
      "SOL/USDT",
      "DOT/USDT",
      "MATIC/USDT",
      "MKR/USDT",
    ],
    includeCommissions: req ? req.query.includeCommissions === "true" : true,
  };

  try {
    await Opportunity.deleteMany({ type: "standard" });

    const opportunities = await detectArbitrageOpportunities(config);
    if (opportunities.length > 0) {
      await Opportunity.insertMany(
        opportunities.map((op) => ({ ...op, type: "standard" }))
      );
    }
    if (res) {
      res.json(opportunities);
    }
  } catch (error) {
    console.error("Error detecting arbitrage opportunities: ", error);
    if (res) {
      res.status(500).json({
        message: "Error during arbitrage detection: " + error.message,
      });
    }
  }
};
