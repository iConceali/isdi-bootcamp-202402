// api/services/tests/user/addCryptoToWatchlist.spec.js
import dotenv from "dotenv";
import mongoose from "mongoose";

import User from "../../../models/User.js";
import CryptoData from "../../../models/CryptoData.js";
import addCryptoToWatchlist from "../../user/addCryptoToWatchlist.js";
import { expect } from "chai";
import { errors } from "com";

dotenv.config();

const { NotFoundError, DuplicityError } = errors;

describe("addCryptoToWatchlist", () => {
  before(() => mongoose.connect(process.env.MONGODB_TEST_URL));

  beforeEach(() => Promise.all([User.deleteMany(), CryptoData.deleteMany()]));

  it("succeeds on adding a new crypto to the watchlist", async () => {
    const user = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      watchlist: [],
    });
    const crypto = await CryptoData.create({
      symbol: "BTC",
      price: 30000,
      price24Hr: 29000,
      marketCap: 600000000,
    });

    await addCryptoToWatchlist(user.id.toString(), crypto.id.toString());

    const updatedUser = await User.findById(user.id);
    expect(updatedUser.watchlist).to.include(crypto.id);
  });

  it("fails if user does not exist", async () => {
    const fakeUserId = new mongoose.Types.ObjectId();
    const crypto = await CryptoData.create({
      symbol: "BTC",
      price: 30000,
      price24Hr: 29000,
      marketCap: 600000000,
    });

    try {
      await addCryptoToWatchlist(fakeUserId.toString(), crypto.id.toString());
      throw new Error("Expected addCryptoToWatchlist to throw NotFoundError");
    } catch (error) {
      expect(error).to.be.instanceOf(NotFoundError);
      expect(error.message).to.equal("User not found");
    }
  });

  it("fails if crypto does not exist", async () => {
    const user = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      watchlist: [],
    });
    const fakeCryptoId = new mongoose.Types.ObjectId();

    try {
      await addCryptoToWatchlist(user.id.toString(), fakeCryptoId.toString());
      throw new Error("Expected addCryptoToWatchlist to throw NotFoundError");
    } catch (error) {
      expect(error).to.be.instanceOf(NotFoundError);
      expect(error.message).to.equal("Crypto not found");
    }
  });

  it("fails if crypto is already in the watchlist", async () => {
    const user = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      watchlist: [],
    });
    const crypto = await CryptoData.create({
      symbol: "BTC",
      price: 30000,
      price24Hr: 29000,
      marketCap: 600000000,
    });

    await addCryptoToWatchlist(user.id.toString(), crypto.id.toString());

    try {
      await addCryptoToWatchlist(user.id.toString(), crypto.id.toString());
      throw new Error("Expected addCryptoToWatchlist to throw DuplicityError");
    } catch (error) {
      expect(error).to.be.instanceOf(DuplicityError);
      expect(error.message).to.equal("Crypto already in watchlist");
    }
  });

  after(() => mongoose.disconnect());
});
