// api/services/tests/cryptoPrices/fetchCryptoPrices.spec.js

import { expect } from "chai";
import mongoose from "mongoose";
import sinon from "sinon";
import axios from "axios";
import CryptoPrice from "../../../models/CryptoPrice.js";
import fetchCryptoPrices from "../../cryptoPrices/fetchCryptoPrices.js";
import { errors } from "com";
import dotenv from "dotenv";

dotenv.config();

const { SystemError } = errors;

describe("fetchCryptoPrices", () => {
  let axiosGetStub;

  before(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URL);
  });

  beforeEach(async () => {
    await CryptoPrice.deleteMany({});
    axiosGetStub = sinon.stub(axios, "get");
  });

  afterEach(() => {
    axiosGetStub.restore();
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it("succeeds in fetching and updating crypto prices", async () => {
    const mockApiResponse = {
      data: {
        data: [
          {
            id: "bitcoin",
            priceUsd: "40000",
            changePercent24Hr: "5",
            marketCapUsd: "600000000000",
          },
          {
            id: "ethereum",
            priceUsd: "3000",
            changePercent24Hr: "4",
            marketCapUsd: "300000000000",
          },
        ],
      },
    };

    axiosGetStub.resolves(mockApiResponse);

    const result = await fetchCryptoPrices();

    expect(result).to.be.an("array");
    expect(result.length).to.equal(2);

    const bitcoin = result.find((crypto) => crypto.symbol === "bitcoin");
    const ethereum = result.find((crypto) => crypto.symbol === "ethereum");

    expect(bitcoin).to.exist;
    expect(bitcoin.price).to.equal(40000);
    expect(bitcoin.price24Hr).to.equal(5);
    expect(bitcoin.marketCap).to.equal("600000000000");

    expect(ethereum).to.exist;
    expect(ethereum.price).to.equal(3000);
    expect(ethereum.price24Hr).to.equal(4);
    expect(ethereum.marketCap).to.equal("300000000000");
  });

  it("fails due to validation error in API response", async () => {
    const mockApiResponse = {
      data: {
        data: [
          {
            id: "bitcoin",
            priceUsd: "invalid-price",
            changePercent24Hr: "5",
            marketCapUsd: "600000000000",
          },
        ],
      },
    };

    axiosGetStub.resolves(mockApiResponse);

    try {
      await fetchCryptoPrices();
      throw new Error("Expected fetchCryptoPrices to throw a validation error");
    } catch (error) {
      expect(error).to.be.instanceOf(SystemError);
      expect(error.message).to.include("Failed to fetch crypto prices");
      //   expect(error.message).to.include("Validation failed for crypto bitcoin");
    }
  });

  it("fails due to API error", async () => {
    axiosGetStub.rejects(new Error("API error"));

    try {
      await fetchCryptoPrices();
      throw new Error("Expected fetchCryptoPrices to throw an API error");
    } catch (error) {
      expect(error).to.be.instanceOf(SystemError);
      expect(error.message).to.include("Failed to fetch crypto prices");
    }
  });

  it("handles no data in API response gracefully", async () => {
    const mockApiResponse = {
      data: {
        data: [],
      },
    };

    axiosGetStub.resolves(mockApiResponse);

    const result = await fetchCryptoPrices();

    expect(result).to.be.an("array").that.is.empty;
  });
});
