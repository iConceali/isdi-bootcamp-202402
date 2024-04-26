// api/controllers/arbitrageController1.js

// import ArbitrageConfig from "../models/ArbitrageConfig.js";

// import sendNotificationEmail from "../utils/mailer.js";
import { detectArbitrageOpportunities } from "../utils/arbitrageDetector1.js";

// export const getAllConfigs = async (req, res) => {
//   try {
//     const configs = await ArbitrageConfig.find();
//     res.json(configs);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching configs: " + error.message });
//   }
// };

// export const createConfig = async (req, res) => {
//   const config = new ArbitrageConfig(req.body);
//   try {
//     const newConfig = await config.save();
//     res.status(201).json(newConfig);
//   } catch (error) {
//     res
//       .status(400)
//       .json({ message: "Error creating config: " + error.message });
//   }
// };

// export const getConfig = async (req, res) => {
//   try {
//     const config = await ArbitrageConfig.findById(req.params.id);
//     if (!config) {
//       return res.status(404).json({ message: "Cannot find configuration" });
//     }
//     res.json(config);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const updateConfig = async (req, res) => {
//   try {
//     const config = await ArbitrageConfig.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(config);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// export const deleteConfig = async (req, res) => {
//   try {
//     await ArbitrageConfig.findByIdAndDelete(req.params.id);
//     res.json({ message: "Configuration deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

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
