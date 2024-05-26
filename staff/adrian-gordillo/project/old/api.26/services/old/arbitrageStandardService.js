//api/services/arbitrageStandardService.js
//servicio y el almacenamiento de datos.

import * as arbitrageHelper from "../services/arbitrageStandardDetector.js";
import Opportunity from "../models/Opportunity.js";

export async function detectArbitrage() {
  const config = getArbitrageConfig();
  await Opportunity.deleteMany({ type: "standard" });

  // arbitrageUtils a helpers
  const opportunities =
    await arbitrageHelper.detectStandardArbitrageOpportunities(config);
  if (opportunities.length > 0) {
    await Opportunity.insertMany(
      opportunities.map((op) => ({ ...op, type: "standard" }))
    );
  }
  return opportunities;
}

function getArbitrageConfig() {
  return {
    umbralRentabilidad: 0.02,
    comisiones: {
      Binance: 0.01, //0.1,
      Kraken: 0.021, //0.21,
      Coinbase: 0.05, //0.5,
      Bitfinex: 0.15, //0.15,
      "Crypto.com": 0.4, //0.4,
      "Gate.io": 0.2, //0.2,
      KuCoin: 0.1, //0.1,
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
    includeCommissions: true,
  };
}
