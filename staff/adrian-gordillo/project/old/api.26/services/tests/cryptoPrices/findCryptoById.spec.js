// api/services/tests/cryptoPrices/findCryptoById.spec.js

import { expect } from "chai";
import mongoose from "mongoose";
import CryptoPrice from "../../../models/CryptoPrice.js";
import findCryptoById from "../../cryptoPrices/findCryptoById.js";
import { errors } from "com";
import dotenv from "dotenv";

dotenv.config();

const { NotFoundError, ContentError } = errors;

describe("findCryptoById", () => {
  let crypto;

  before(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URL);
  });

  beforeEach(async () => {
    await CryptoPrice.deleteMany({});
    crypto = new CryptoPrice({
      symbol: "bitcoin",
      price: 40000,
      price24Hr: 5,
      marketCap: "600000000000",
    });
    await crypto.save();
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it("succeeds in finding a crypto by ID", async () => {
    const foundCrypto = await findCryptoById(crypto._id.toString());

    expect(foundCrypto).to.exist;
    expect(foundCrypto._id.toString()).to.equal(crypto._id.toString());
    expect(foundCrypto.symbol).to.equal(crypto.symbol);
  });

  it("fails with validation error for invalid ID", async () => {
    try {
      await findCryptoById("");
      throw new Error("Expected findCryptoById to throw a validation error");
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.include("crypto ID >< is empty or blank");
    }
  });

  it("fails when the crypto is not found", async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();
    try {
      await findCryptoById(nonExistentId);
      throw new Error("Expected findCryptoById to throw a NotFoundError");
    } catch (error) {
      expect(error).to.be.instanceOf(NotFoundError);
      expect(error.message).to.include("Crypto not found");
    }
  });
});
