// api/services/tests/orders/getOrders.spec.js

import { expect } from "chai";
import mongoose from "mongoose";
import sinon from "sinon";
import Order from "../../../models/OrdersRegister.js";
import getOrders from "../../orders/getOrders.js";
import { errors } from "com";
import dotenv from "dotenv";

dotenv.config();

const { ContentError } = errors;

describe("getOrders", () => {
  before(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URL);
  });

  after(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await Order.deleteMany({});
  });

  it("succeeds in fetching orders for a user", async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const orders = [
      {
        userId,
        symbol: "BTCUSDT",
        date: "2024-05-22",
        investment: 1000,
        profitPercent: 10,
        profitDollars: 100,
      },
      {
        userId,
        symbol: "ETHUSDT",
        date: "2024-05-22",
        investment: 500,
        profitPercent: 15,
        profitDollars: 75,
      },
    ];

    await Order.insertMany(orders);

    const result = await getOrders(userId);

    expect(result).to.have.lengthOf(2);
    expect(result[0].userId.toString()).to.equal(userId);
    expect(result[0]).to.include({ symbol: "BTCUSDT" });
    expect(result[1].userId.toString()).to.equal(userId);
    expect(result[1]).to.include({ symbol: "ETHUSDT" });
  });

  it("returns an empty array if no orders are found for a user", async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const result = await getOrders(userId);
    expect(result).to.be.an("array").that.is.empty;
  });

  it("fails with validation error for invalid userId", async () => {
    try {
      await getOrders("");
      throw new Error("Expected getOrders to throw a validation error");
    } catch (error) {
      expect(error).to.be.instanceOf(errors.ContentError);
      expect(error.message).to.include("User ID >< is empty or blank");
    }
  });

  it("fails to fetch orders due to database error", async () => {
    const findStub = sinon
      .stub(Order, "find")
      .rejects(new Error("Database error"));

    try {
      await getOrders(new mongoose.Types.ObjectId().toString());
      throw new Error("Expected getOrders to throw a ContentError");
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.include("Failed to fetch orders");
    }

    findStub.restore();
  });
});
