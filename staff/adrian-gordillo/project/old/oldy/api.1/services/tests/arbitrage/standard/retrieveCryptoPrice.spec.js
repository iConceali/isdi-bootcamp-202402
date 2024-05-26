// api/services/tests/arbitrage/standard/retrieveCryptoPrice.spec.js

import { expect } from "chai";
import sinon from "sinon";
import axios from "axios";
import { exchanges } from "../../../arbitrage/standard/symbolMappings.js";
import retrieveCryptoPrice from "../../../arbitrage/standard/retrieveCryptoPrice.js";
import { errors } from "com";

const { SystemError, ContentError } = errors;

describe("retrieveCryptoPrice", () => {
  let axiosGetStub;

  beforeEach(() => {
    axiosGetStub = sinon.stub(axios, "get");
  });

  afterEach(() => {
    axiosGetStub.restore();
  });

  it("succeeds in retrieving and formatting crypto price from an exchange", async () => {
    const mockApiResponse = { bidPrice: "40000", askPrice: "41000" };
    axiosGetStub.resolves({ data: mockApiResponse });

    const result = await retrieveCryptoPrice(exchanges[0], "BTC/USDT", 0.1);

    expect(result).to.be.an("object");
    expect(result).to.have.property("exchange", "Binance");
    expect(result).to.have.property("symbol", "BTC/USDT");
    expect(result).to.have.property("bid", 40000 * (1 - 0.1 / 100));
    expect(result).to.have.property("ask", 41000 * (1 + 0.1 / 100));
  });

  it("fails due to missing symbol mapping", async () => {
    try {
      await retrieveCryptoPrice(exchanges[0], "INVALID/USDT", 0.1);
      throw new Error("Expected retrieveCryptoPrice to throw a ContentError");
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.include(
        "No symbol mapping found for INVALID/USDT on Binance."
      );
    }
  });

  it("fails due to validation error in price response", async () => {
    const mockApiResponse = {
      bidPrice: "invalid-bid",
      askPrice: "invalid-ask",
    };
    axiosGetStub.resolves({ data: mockApiResponse });

    try {
      await retrieveCryptoPrice(exchanges[0], "BTC/USDT", 0.1);
      throw new Error("Expected retrieveCryptoPrice to throw a SystemError");
    } catch (error) {
      expect(error).to.be.instanceOf(SystemError);
      expect(error.message).to.include(
        "Failed to retrieve price for BTC/USDT from Binance"
      );
    }
  });

  it("fails due to API error", async () => {
    axiosGetStub.rejects(new Error("API error"));

    try {
      await retrieveCryptoPrice(exchanges[0], "BTC/USDT", 0.1);
      throw new Error("Expected retrieveCryptoPrice to throw an API error");
    } catch (error) {
      expect(error).to.be.instanceOf(SystemError);
      expect(error.message).to.include(
        "Failed to retrieve price for BTC/USDT from Binance"
      );
    }
  });
});
