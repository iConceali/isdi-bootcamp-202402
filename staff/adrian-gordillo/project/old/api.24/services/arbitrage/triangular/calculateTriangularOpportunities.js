// api/services/arbitrage/triangular/calculateTriangularOpportunities.js

import fetchSymbolPrices from "./fetchSymbolPrices.js";
import { errors, validate } from "com";

const { ContentError, SystemError } = errors;

// Calcula oportunidades de arbitraje triangular para un triángulo específico de criptomonedas

const calculateTriangularOpportunities = async (triangle) => {
  try {
    const tickers = await Promise.all(triangle.map(fetchSymbolPrices));

    if (tickers.some((ticker) => !ticker)) {
      return []; // Skip this triangle if any ticker data is missing
    }

    let startingAmount = 1000;
    let currentAmount = startingAmount;
    const trades = [];

    for (let i = 0; i < tickers.length; i++) {
      const ticker = tickers[i];
      const parts = /^(\w+)(USD|USDT|ETH|BTC)$/.exec(triangle[i]);
      if (!parts) continue;

      const tradeAmount =
        i === tickers.length - 1
          ? currentAmount * ticker.bidPrice
          : currentAmount / ticker.askPrice;

      trades.push({ from: parts[1], to: parts[2], amount: tradeAmount });
      currentAmount = tradeAmount;
    }

    const profit = currentAmount - startingAmount;

    // Validar el cálculo de la ganancia
    validate.number(profit, "profit");

    if (profit > 0.02) {
      return [
        {
          type: "triangular",
          success: true,
          profit,
          trades,
          exchange: "Binance",
        },
      ];
    }

    return [];
  } catch (error) {
    if (error instanceof ContentError) {
      console.error(`Validation error: ${error.message}`);
      throw error;
    } else {
      throw new SystemError(
        `Error processing triangular opportunities: ${error.message}`
      );
    }
  }
};

export default calculateTriangularOpportunities;
