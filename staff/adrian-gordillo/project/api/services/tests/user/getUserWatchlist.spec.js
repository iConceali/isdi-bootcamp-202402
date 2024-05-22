// api/services/tests/user/getUserWatchlist.spec.js
import dotenv from "dotenv";
import mongoose from "mongoose";

import User from "../../../models/User.js";
import CryptoPrice from "../../../models/CryptoPrice.js";
import getUserWatchlist from "../../user/getUserWatchlist.js";
import { expect } from "chai";
import { errors } from "com";

dotenv.config();

const { NotFoundError } = errors;

describe("getUserWatchlist", () => {
  before(() => mongoose.connect(process.env.MONGODB_TEST_URL));

  beforeEach(() => Promise.all([User.deleteMany(), CryptoPrice.deleteMany()]));

  it("succeeds on retrieving the user's watchlist", async () => {
    const crypto1 = await CryptoPrice.create({
      symbol: "BTC",
      price: 30000,
      price24Hr: 29000,
      marketCap: "600B",
    });
    const crypto2 = await CryptoPrice.create({
      symbol: "ETH",
      price: 2000,
      price24Hr: 1900,
      marketCap: "200B",
    });
    const user = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      watchlist: [crypto1._id, crypto2._id],
    });

    const watchlist = await getUserWatchlist(user._id.toString());

    expect(watchlist).to.be.an("array");
    expect(watchlist).to.have.lengthOf(2);
    expect(watchlist.map((id) => id.toString())).to.include(
      crypto1._id.toString()
    );
    expect(watchlist.map((id) => id.toString())).to.include(
      crypto2._id.toString()
    );
  });

  it("fails if user does not exist", async () => {
    const fakeUserId = new mongoose.Types.ObjectId();

    try {
      await getUserWatchlist(fakeUserId.toString());
    } catch (error) {
      expect(error).to.be.instanceOf(NotFoundError);
      expect(error.message).to.equal("User not found");
    }
  });

  it("succeeds with an empty watchlist", async () => {
    const user = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      watchlist: [],
    });

    const watchlist = await getUserWatchlist(user._id.toString());

    expect(watchlist).to.be.an("array");
    expect(watchlist).to.have.lengthOf(0);
  });

  after(() => mongoose.disconnect());
});
