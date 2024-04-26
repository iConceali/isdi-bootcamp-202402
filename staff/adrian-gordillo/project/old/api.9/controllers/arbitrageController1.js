// api/controllers/arbitrageController1.js

import { detectArbitrageOpportunities } from "../utils/arbitrageDetector1.js";

export const detectArbitrageAndNotify = async (req, res) => {
  const includeCommissions = req.query.includeCommissions === "true";
  const config = {
    umbralRentabilidad: 0.1,
    comisiones: includeCommissions
      ? {
          Binance: 0.1,
          Kraken: 0.21,
          Coinbase: 0.5,
          Bitfinex: 0.15,
          "Crypto.com": 0.4,
          "Gate.io": 0.2,
          KuCoin: 0.1,
        }
      : {},
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
  };

  try {
    const opportunities = await detectArbitrageOpportunities(
      config,
      includeCommissions
    );
    res.json(opportunities);
  } catch (error) {
    console.error("Error detecting arbitrage opportunities: ", error);
    res
      .status(500)
      .json({ message: "Error during arbitrage detection: " + error.message });
  }
};
