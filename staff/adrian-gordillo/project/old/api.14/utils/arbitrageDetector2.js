// api/utils/arbitrageDetector2.js

import axios from "axios";

// Obtener información de ticker del libro de órdenes para un símbolo específico
const getSymbolBookTicker = async (symbol) => {
  try {
    const response = await axios.get(
      `https://api.binance.com/api/v3/ticker/bookTicker?symbol=${symbol}`
    );
    return {
      symbol,
      bidPrice: parseFloat(response.data.bidPrice),
      askPrice: parseFloat(response.data.askPrice),
      exchange: "Binance", // Estableciendo explícitamente el exchange como Binance
    };
  } catch (error) {
    throw new Error(`Error al obtener el book ticker para ${symbol}: ${error}`);
  }
};

// Función para dividir el símbolo en la moneda base y la moneda cotizada
const getSymbolParts = (symbol) => {
  // Regex para dividir los símbolos en base y quote (por ejemplo, BTCUSDT en BTC y USDT)
  const match = symbol.match(/^(.+?)(USD|USDT|ETH|BTC)$/);
  return match ? { base: match[2], quote: match[1] } : null;
};

export const detectTriangularArbitrage = async () => {
  const triangles = [
    ["BTCUSDT", "ETHBTC", "ETHUSDT"],
    ["BTCUSDT", "BNBBTC", "BNBUSDT"],
    ["ETHUSDT", "BNBETH", "BNBUSDT"],
    ["BTCUSDT", "ADABTC", "ADAUSDT"],
    ["BTCUSDT", "XRPBTC", "XRPUSDT"],
    ["BTCUSDT", "LTCBTC", "LTCUSDT"],
    ["ETHBTC", "XRPETH", "XRPBTC"],
    ["BTCUSDT", "DOTBTC", "DOTUSDT"],
    ["ETHUSDT", "LINKETH", "LINKUSDT"],
    ["BTCUSDT", "DOGEUSDT", "DOGEBTC"],
    ["ETHUSDT", "AAVEETH", "AAVEUSDT"],
    ["BTCUSDT", "UNIBTC", "UNIUSDT"],
    ["ETHBTC", "LTCETH", "LTCBTC"],
    ["BTCUSDT", "VETBTC", "VETUSDT"],
    ["ETHBTC", "MANAETH", "MANABTC"],
    ["BTCUSDT", "FILBTC", "FILUSDT"],
    ["ETHBTC", "ATOMETH", "ATOMBTC"],
    ["BTCUSDT", "CAKEBTC", "CAKEUSDT"],
    ["ETHBTC", "XLMETH", "XLMBTC"],
    ["BTCUSDT", "MATICBTC", "MATICUSDT"],
  ];

  const allArbitrageOpportunities = [];

  for (const triangle of triangles) {
    const tickers = await Promise.all(triangle.map(getSymbolBookTicker));
    let startingAmount = 1000; // Cantidad inicial para la simulación
    let currentAmount = startingAmount;
    let trades = [];

    for (let i = 0; i < tickers.length; i++) {
      const parts = getSymbolParts(triangle[i]);
      if (!parts) {
        console.error(`No se pudo interpretar el símbolo ${triangle[i]}`);
        continue;
      }
      const tradeAmount =
        i === tickers.length - 1
          ? currentAmount * tickers[i].bidPrice
          : currentAmount / tickers[i].askPrice;
      trades.push({
        from: parts.base,
        to: parts.quote,
        amount: tradeAmount,
      });
      currentAmount = tradeAmount;
    }

    let profit = currentAmount - startingAmount;
    if (profit > 0.02) {
      // Umbral de rentabilidad del 0.02%
      allArbitrageOpportunities.push({
        success: true,
        profit,
        trades,
        exchanges: "Binance",
      });
    }
  }

  return allArbitrageOpportunities.length > 0
    ? allArbitrageOpportunities
    : [
        {
          success: false,
          message: "No se encontraron oportunidades de arbitraje triangular.",
        },
      ];
};
