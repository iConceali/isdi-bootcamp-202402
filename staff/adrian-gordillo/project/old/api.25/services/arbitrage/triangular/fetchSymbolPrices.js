// api/services/arbitrage/triangular/fetchSymbolPrices.js

import axios from "axios";
import { errors, validate } from "com";

const { SystemError, ContentError } = errors;

// Recupera el precio de un símbolo específico desde Binance

const fetchSymbolPrices = async (symbol) => {
  try {
    const response = await axios.get(
      `https://api.binance.com/api/v3/ticker/bookTicker?symbol=${symbol}`
    );

    const bidPrice = parseFloat(response.data.bidPrice);
    const askPrice = parseFloat(response.data.askPrice);

    // Validar los precios obtenidos
    try {
      validate.number(bidPrice, "bid price");
      validate.number(askPrice, "ask price");
    } catch (validationError) {
      throw new ContentError(validationError.message);
    }

    return {
      symbol,
      bidPrice,
      askPrice,
      exchange: "Binance",
    };
  } catch (error) {
    if (error instanceof ContentError) {
      console.error(`Validation error: ${error.message}`);
      throw error;
    } else {
      console.error(
        `Error fetching book ticker for ${symbol}: ${error.message}`
      );
      throw new SystemError(`Failed to fetch prices for ${symbol}`);
    }
  }
};

export default fetchSymbolPrices;
