// api/services/arbitrage/standard/getArbitrageConfig.js

import { validate } from "com";

// Obtiene la configuración de arbitraje standard

const getArbitrageConfig = () => {
  const config = {
    umbralRentabilidad: 0.01,
    comisiones: {
      Binance: 0.01,
      Kraken: 0.021,
      Coinbase: 0.05,
      Bitfinex: 0.015,
      "Crypto.com": 0.04,
      "Gate.io": 0.02,
      KuCoin: 0.01,
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

  // Validar la configuración
  validate.number(config.umbralRentabilidad, "umbralRentabilidad");
  for (const [exchange, commission] of Object.entries(config.comisiones)) {
    validate.number(commission, `commission for ${exchange}`);
  }
  config.paresCriptomonedas.forEach((pair) => validate.text(pair, "pair"));

  return config;
};

export default getArbitrageConfig;
