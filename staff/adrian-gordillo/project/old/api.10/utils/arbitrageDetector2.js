// api/utils/arbitrageDetector2.js

import axios from "axios";

const getSymbolBookTicker = async (symbol) => {
  try {
    const response = await axios.get(
      `https://api.binance.com/api/v3/ticker/bookTicker?symbol=${symbol}`
    );
    return {
      symbol,
      bidPrice: parseFloat(response.data.bidPrice),
      askPrice: parseFloat(response.data.askPrice),
    };
  } catch (error) {
    throw new Error(`Error al obtener el book ticker para ${symbol}: ${error}`);
  }
};

// Función para dividir el símbolo en la moneda base y la moneda cotizada
const getSymbolParts = (symbol) => {
  const match = symbol.match(/^(.+)(USD|USDT|ETH|BTC)$/);
  return match ? [match[2], match[1]] : [symbol, ""]; // Retorna el símbolo base y la moneda de cotización
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

  const allArbitrageOpportunities = []; // Almacena todas las oportunidades encontradas

  for (const triangle of triangles) {
    const arbitrageOpportunities = []; // Almacena las oportunidades encontradas para este triángulo

    const tickers = await Promise.all(triangle.map(getSymbolBookTicker));
    let startingAmount = 1000; // Cantidad inicial en la moneda base del primer par
    let currentAmount = startingAmount;
    let trades = [];

    for (let i = 0; i < tickers.length; i++) {
      const [fromCurrency, toCurrency] = getSymbolParts(triangle[i]);
      let trade;
      if (i === tickers.length - 1) {
        // Último trade, cerrando el ciclo
        trade = currentAmount * tickers[i].bidPrice;
      } else {
        // Compras intermedias
        trade = currentAmount / tickers[i].askPrice;
      }
      trades.push({
        from: fromCurrency,
        to: toCurrency,
        amount: trade,
      });
      currentAmount = trade;
    }

    const umbralProfit = 0.05;

    let profit = currentAmount - startingAmount;
    if (profit > umbralProfit) {
      arbitrageOpportunities.push({
        success: true,
        profit,
        triangle: triangle.join(" > "),
        trades,
      });
    }

    allArbitrageOpportunities.push(...arbitrageOpportunities); // Agregar las oportunidades encontradas para este triángulo a la matriz general
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
