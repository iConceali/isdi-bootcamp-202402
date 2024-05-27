// api/services/arbitrage/standard/retrieveCryptoPrice.js

import axios from "axios";
import { symbolMappings } from "./symbolMappings.js";
import { errors, validate } from "com";

const { SystemError, ContentError } = errors;

// Recupera precios de criptomonedas
const retrieveCryptoPrice = async (exchange, standardSymbol, commission) => {
  try {
    const symbol = symbolMappings[standardSymbol]?.[exchange.name];
    if (!symbol) {
      throw new ContentError(
        `No symbol mapping found for ${standardSymbol} on ${exchange.name}.`
      );
    }

    const url = `${exchange.url}${symbol}${exchange.endpointSuffix || ""}`;
    const response = await axios.get(url);
    const { bid, ask } = exchange.format(response.data);

    validate.number(bid, "bid price");
    validate.number(ask, "ask price");

    return {
      exchange: exchange.name,
      symbol: standardSymbol,
      bid: bid * (1 - commission / 100),
      ask: ask * (1 + commission / 100),
    };
  } catch (error) {
    if (error instanceof ContentError) {
      console.error(`Validation error: ${error.message}`);
      throw error;
    } else {
      console.error(
        `Error fetching price from ${exchange.name} for ${standardSymbol}: ${error.message}`
      );
      throw new SystemError(
        `Failed to retrieve price for ${standardSymbol} from ${exchange.name}`
      );
    }
  }
};

export default retrieveCryptoPrice;
