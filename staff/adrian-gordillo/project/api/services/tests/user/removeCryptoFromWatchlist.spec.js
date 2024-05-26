// api/services/tests/user/removeCryptoFromWatchlist.spec.js
import dotenv from "dotenv";
import mongoose from "mongoose";

import User from "../../../models/User.js";
import CryptoData from "../../../models/CryptoData.js";
import removeCryptoFromWatchlist from "../../user/removeCryptoFromWatchlist.js";
import { expect } from "chai";
import { errors } from "com";

dotenv.config();

const { NotFoundError } = errors;

describe("removeCryptoFromWatchlist", () => {
  before(() => mongoose.connect(process.env.MONGODB_TEST_URL));

  beforeEach(() => Promise.all([User.deleteMany(), CryptoData.deleteMany()]));

  it("succeeds on removing a crypto from the watchlist", async () => {
    const crypto = await CryptoData.create({
      symbol: "BTC",
      price: 30000,
      price24Hr: 29000,
      marketCap: 6000000,
    });
    const user = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      watchlist: [crypto.id],
    });

    await removeCryptoFromWatchlist(user.id.toString(), crypto.id.toString());

    const updatedUser = await User.findById(user.id);

    expect(updatedUser.watchlist).to.not.include(crypto.id);
  });

  it("fails if user does not exist", async () => {
    const fakeUserId = new mongoose.Types.ObjectId();
    const crypto = await CryptoData.create({
      symbol: "BTC",
      price: 30000,
      price24Hr: 29000,
      marketCap: 6000000,
    });

    try {
      await removeCryptoFromWatchlist(
        fakeUserId.toString(),
        crypto.id.toString()
      );
    } catch (error) {
      expect(error).to.be.instanceOf(NotFoundError);
      expect(error.message).to.equal("User not found");
    }
  });

  it("succeeds if crypto is not in the watchlist", async () => {
    const crypto = await CryptoData.create({
      symbol: "BTC",
      price: 30000,
      price24Hr: 29000,
      marketCap: 6000000,
    });
    const user = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      watchlist: [],
    });

    await removeCryptoFromWatchlist(user.id.toString(), crypto.id.toString());

    const updatedUser = await User.findById(user.id);

    expect(updatedUser.watchlist).to.not.include(crypto.id);
  });

  after(() => mongoose.disconnect());
});
