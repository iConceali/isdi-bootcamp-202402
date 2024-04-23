// api/controllers/arbitrageController.js

import ArbitrageConfig from "../models/ArbitrageConfig.js";
// import sendNotificationEmail from "../utils/mailer.js";
import { detectArbitrageOpportunities } from "../utils/arbitrageDetector.js";

export const getAllConfigs = async (req, res) => {
  try {
    const configs = await ArbitrageConfig.find();
    res.json(configs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching configs: " + error.message });
  }
};

export const createConfig = async (req, res) => {
  const config = new ArbitrageConfig(req.body);
  try {
    const newConfig = await config.save();
    res.status(201).json(newConfig);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating config: " + error.message });
  }
};

export const getConfig = async (req, res) => {
  try {
    const config = await ArbitrageConfig.findById(req.params.id);
    if (!config) {
      return res.status(404).json({ message: "Cannot find configuration" });
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateConfig = async (req, res) => {
  try {
    const config = await ArbitrageConfig.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(config);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteConfig = async (req, res) => {
  try {
    await ArbitrageConfig.findByIdAndDelete(req.params.id);
    res.json({ message: "Configuration deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const detectArbitrageAndNotify = async (req, res) => {
  // console.log("Inicio de detección de oportunidades de arbitraje");
  try {
    const config = {
      umbralRentabilidad: 0.1,
      comisiones: {
        Binance: 0.01,
        Kraken: 0.02,
        Coinbase: 0.025,
        Bitfinex: 0.02,
        "Crypto.com": 0.016,
        "Gate.io": 0.02,
        KuCoin: 0.01,
      },
      paresCriptomonedas: [
        "BTC/USDT",
        "ETH/USDT",
        "LTC/USDT",
        "ADA/USDT",
        // "SOL/USDT",
        // "DOT/USDT",
        // "MATIC/USDT",
      ],
    };

    // console.log("Configuración utilizada:", config);
    const opportunities = await detectArbitrageOpportunities(config);
    // console.log("Oportunidades detectadas:", opportunities);

    // if (opportunities.length > 0) {
    //   opportunities.forEach((opportunity) => {
    //     console.log("Notificando oportunidad:", opportunity);
    //     // sendNotificationEmail(opportunity);
    //   });
    // }
    res.json(opportunities);
  } catch (error) {
    console.error("Error detecting arbitrage opportunities: ", error);
    res
      .status(500)
      .json({ message: "Error during arbitrage detection: " + error.message });
  }
};

// import ArbitrageConfig from "../models/ArbitrageConfig.js";
// import sendNotificationEmail from "../utils/mailer.js";
// import { detectArbitrageOpportunities } from "../utils/arbitrageDetector.js";

// const getAllConfigs = async (req, res) => {
//   try {
//     const configs = await ArbitrageConfig.find();
//     res.json(configs);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching configs: " + error.message });
//   }
// };
// const createConfig = async (req, res) => {
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

// const getConfig = async (req, res) => {
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

// const updateConfig = async (req, res) => {
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

// const deleteConfig = async (req, res) => {
//   try {
//     await ArbitrageConfig.findByIdAndDelete(req.params.id);
//     res.json({ message: "Configuration deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const detectArbitrageAndNotify = async (req, res) => {
//   console.log("Inicio de detección de oportunidades de arbitraje");
//   try {
//     const config = {
//       umbralRentabilidad: 10,
//       paresCriptomonedas: [
//         "BTC/USDT",
//         "ETH/USDT",
//         "LTC/USDT",
//         "ADA/USDT",
//         "SOL/USDT",
//         "DOT/USDT",
//         "MATIC/USDT",
//       ],
//     };

//     console.log("Configuración utilizada:", config);
//     const opportunities = await detectArbitrageOpportunities(config);
//     console.log("Oportunidades detectadas:", opportunities);

//     if (opportunities.length > 0) {
//       opportunities.forEach((opportunity) => {
//         console.log("Notificando oportunidad:", opportunity);
//         sendNotificationEmail(opportunity);
//       });
//     }
//     res.json(opportunities);
//   } catch (error) {
//     console.error("Error detecting arbitrage opportunities: ", error);
//     res.status(500).json({ message: "Error during arbitrage detection" });
//   }
// };

// export {
//   getAllConfigs,
//   createConfig,
//   getConfig,
//   updateConfig,
//   deleteConfig,
//   detectArbitrageAndNotify,
// };
