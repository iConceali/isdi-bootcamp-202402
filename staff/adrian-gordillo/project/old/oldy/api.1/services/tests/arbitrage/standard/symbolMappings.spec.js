// api/services/tests/arbitrage/standard/symbolMappings.spec.js

import { expect } from "chai";
import {
  exchanges,
  symbolMappings,
} from "../../../arbitrage/standard/symbolMappings.js";

describe("symbolMappings", () => {
  it("should have valid exchanges configurations", () => {
    expect(exchanges).to.be.an("array").that.is.not.empty;

    exchanges.forEach((exchange) => {
      expect(exchange).to.have.property("name").that.is.a("string");
      expect(exchange).to.have.property("url").that.is.a("string");
      expect(exchange).to.have.property("format").that.is.a("function");

      // Test the format function with a mock response
      if (exchange.name === "Binance") {
        const mockData = { bidPrice: "40000", askPrice: "41000" };
        const formatted = exchange.format(mockData);
        expect(formatted).to.have.property("bid", 40000);
        expect(formatted).to.have.property("ask", 41000);
      }
      // Similar tests can be added for other exchanges
    });
  });

  it("should have correct symbol mappings for BTC/USDT", () => {
    const symbol = "BTC/USDT";
    expect(symbolMappings).to.have.property(symbol);

    const mappings = symbolMappings[symbol];
    expect(mappings).to.have.property("Binance", "BTCUSDT");
    expect(mappings).to.have.property("Kraken", "XXBTZUSD");
    expect(mappings).to.have.property("Coinbase", "BTC-USD");
    expect(mappings).to.have.property("Bitfinex", "tBTCUSD");
    expect(mappings).to.have.property("Crypto.com", "BTC_USDT");
    expect(mappings).to.have.property("Gate.io", "BTC_USDT");
    expect(mappings).to.have.property("KuCoin", "BTC-USDT");
  });

  it("should have correct symbol mappings for ETH/USDT", () => {
    const symbol = "ETH/USDT";
    expect(symbolMappings).to.have.property(symbol);

    const mappings = symbolMappings[symbol];
    expect(mappings).to.have.property("Binance", "ETHUSDT");
    expect(mappings).to.have.property("Kraken", "XETHZUSD");
    expect(mappings).to.have.property("Coinbase", "ETH-USD");
    expect(mappings).to.have.property("Bitfinex", "tETHUSD");
    expect(mappings).to.have.property("Crypto.com", "ETH_USDT");
    expect(mappings).to.have.property("Gate.io", "ETH_USDT");
    expect(mappings).to.have.property("KuCoin", "ETH-USDT");
  });

  // Similar tests can be added for other symbols
});
