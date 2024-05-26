// api/services/tests/user/removeCryptoFromWatchlist.spec.js
import dotenv from "dotenv";
import mongoose from "mongoose";

import User from "../../../models/User.js";
import CryptoPrice from "../../../models/CryptoPrice.js";
import removeCryptoFromWatchlist from "../../user/removeCryptoFromWatchlist.js";
import { expect } from "chai";
import { errors } from "com";

dotenv.config();

const { NotFoundError } = errors;

describe("removeCryptoFromWatchlist", () => {
  before(() => mongoose.connect(process.env.MONGODB_TEST_URL));

  beforeEach(() => Promise.all([User.deleteMany(), CryptoPrice.deleteMany()]));

  it("succeeds on removing a crypto from the watchlist", async () => {
    const crypto = await CryptoPrice.create({
      symbol: "BTC",
      price: 30000,
      price24Hr: 29000,
      marketCap: "600B",
    });
    const user = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      watchlist: [crypto._id],
    });

    const updatedUser = await removeCryptoFromWatchlist(
      user._id.toString(),
      crypto._id.toString()
    );

    expect(updatedUser.watchlist).to.not.include(crypto._id);
  });

  it("fails if user does not exist", async () => {
    const fakeUserId = new mongoose.Types.ObjectId();
    const crypto = await CryptoPrice.create({
      symbol: "BTC",
      price: 30000,
      price24Hr: 29000,
      marketCap: "600B",
    });

    try {
      await removeCryptoFromWatchlist(
        fakeUserId.toString(),
        crypto._id.toString()
      );
    } catch (error) {
      expect(error).to.be.instanceOf(NotFoundError);
      expect(error.message).to.equal("User not found");
    }
  });

  it("succeeds if crypto is not in the watchlist", async () => {
    const crypto = await CryptoPrice.create({
      symbol: "BTC",
      price: 30000,
      price24Hr: 29000,
      marketCap: "600B",
    });
    const user = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      watchlist: [],
    });

    const updatedUser = await removeCryptoFromWatchlist(
      user._id.toString(),
      crypto._id.toString()
    );

    expect(updatedUser.watchlist).to.not.include(crypto._id);
  });

  after(() => mongoose.disconnect());
});
