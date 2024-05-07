//api/logic/arbitrageStandardService.js
//servicio y el almacenamiento de datos.

import * as arbitrageUtils from "../logic/arbitrageStandardDetector.js";
import Opportunity from "../models/StandardAndTriangularOpportunityModel.js";

export async function detectArbitrageAndSave() {
  const config = getArbitrageConfig();
  await Opportunity.deleteMany({ type: "standard" });

  const opportunities =
    await arbitrageUtils.detectStandardArbitrageOpportunities(config);
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
      Binance: 0, //0.1,
      Kraken: 0, //0.21,
      Coinbase: 0, //0.5,
      Bitfinex: 0, //0.15,
      "Crypto.com": 0, //0.4,
      "Gate.io": 0, //0.2,
      KuCoin: 0, //0.1,
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
