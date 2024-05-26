// api/services/tests/arbitrage/triangular/fetchSymbolPrices.spec.js

import { expect } from "chai";
import sinon from "sinon";
import axios from "axios";
import fetchSymbolPrices from "../../../arbitrage/triangular/fetchSymbolPrices.js";
import { errors, validate } from "com";

const { SystemError, ContentError } = errors;

describe("fetchSymbolPrices", () => {
  let axiosGetStub;
  let validateNumberStub;

  beforeEach(() => {
    axiosGetStub = sinon.stub(axios, "get");
    validateNumberStub = sinon.stub(validate, "number");
  });

  afterEach(() => {
    axiosGetStub.restore();
    validateNumberStub.restore();
  });

  it("succeeds in fetching and validating symbol prices", async () => {
    const mockResponse = {
      data: {
        bidPrice: "50000",
        askPrice: "51000",
      },
    };

    axiosGetStub.resolves(mockResponse);
    validateNumberStub.returns(true);

    const symbol = "BTCUSDT";
    const result = await fetchSymbolPrices(symbol);

    expect(result).to.deep.equal({
      symbol: "BTCUSDT",
      bidPrice: 50000,
      askPrice: 51000,
      exchange: "Binance",
    });
    expect(
      axiosGetStub.calledOnceWith(
        `https://api.binance.com/api/v3/ticker/bookTicker?symbol=${symbol}`
      )
    ).to.be.true;
    expect(validateNumberStub.calledTwice).to.be.true;
    expect(validateNumberStub.firstCall.args).to.deep.equal([
      50000,
      "bid price",
    ]);
    expect(validateNumberStub.secondCall.args).to.deep.equal([
      51000,
      "ask price",
    ]);
  });

  it("fails with validation error for invalid prices", async () => {
    const mockResponse = {
      data: {
        bidPrice: "invalid",
        askPrice: "51000",
      },
    };

    axiosGetStub.resolves(mockResponse);
    validateNumberStub
      .withArgs(parseFloat("invalid"))
      .throws(new ContentError("Validation error"));

    try {
      await fetchSymbolPrices("BTCUSDT");
      throw new Error("Expected fetchSymbolPrices to throw a validation error");
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.include("Validation error");
    }
  });

  it("fails due to API error", async () => {
    axiosGetStub.rejects(new Error("API error"));

    try {
      await fetchSymbolPrices("BTCUSDT");
      throw new Error("Expected fetchSymbolPrices to throw a system error");
    } catch (error) {
      expect(error).to.be.instanceOf(SystemError);
      expect(error.message).to.include("Failed to fetch prices for BTCUSDT");
    }
  });
});
