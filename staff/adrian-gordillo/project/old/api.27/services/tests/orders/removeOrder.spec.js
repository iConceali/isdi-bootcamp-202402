// api/services/tests/orders/removeOrder.spec.js

import { expect } from "chai";
import mongoose from "mongoose";
import sinon from "sinon";
import Order from "../../../models/OrdersRegister.js";
import removeOrder from "../../orders/removeOrder.js";
import { errors } from "com";
import dotenv from "dotenv";

dotenv.config();

const { ContentError, NotFoundError, UnauthorizedError } = errors;

describe("removeOrder", () => {
  let order;

  before(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URL);
  });

  beforeEach(async () => {
    await Order.deleteMany({});
    order = new Order({
      userId: new mongoose.Types.ObjectId(),
      symbol: "BTCUSDT",
      date: "2024-05-22",
      investment: 1000,
      profitPercent: 10,
      profitDollars: 100,
    });
    await order.save();
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it("succeeds in deleting an order", async () => {
    const userId = order.userId.toString();
    const orderId = order._id.toString();

    await removeOrder(orderId, userId);

    const deletedOrder = await Order.findById(orderId);
    expect(deletedOrder).to.be.null;
  });

  it("fails with validation error for invalid orderId", async () => {
    try {
      await removeOrder("", order.userId.toString());
      throw new Error("Expected removeOrder to throw a validation error");
    } catch (error) {
      expect(error).to.be.instanceOf(errors.ContentError);
      expect(error.message).to.include("Order ID >< is empty or blank");
    }
  });

  it("fails with validation error for invalid userId", async () => {
    try {
      await removeOrder(order._id.toString(), "");
      throw new Error("Expected removeOrder to throw a validation error");
    } catch (error) {
      expect(error).to.be.instanceOf(errors.ContentError);
      expect(error.message).to.include("User ID >< is empty or blank");
    }
  });

  it("fails when the trade is not found", async () => {
    const nonExistentOrderId = new mongoose.Types.ObjectId().toString();
    try {
      await removeOrder(nonExistentOrderId, order.userId.toString());
      throw new Error("Expected removeOrder to throw a NotFoundError");
    } catch (error) {
      expect(error).to.be.instanceOf(NotFoundError);
      expect(error.message).to.include("Trade not found");
    }
  });

  it("fails when the user is not authorized to delete the trade", async () => {
    const differentUserId = new mongoose.Types.ObjectId().toString();
    try {
      await removeOrder(order._id.toString(), differentUserId);
      throw new Error("Expected removeOrder to throw an UnauthorizedError");
    } catch (error) {
      expect(error).to.be.instanceOf(UnauthorizedError);
      expect(error.message).to.include("Not authorized to delete this trade");
    }
  });

  it("fails to delete order due to database error", async () => {
    const findByIdAndDeleteStub = sinon
      .stub(Order, "findByIdAndDelete")
      .rejects(new Error("Database error"));

    try {
      await removeOrder(order._id.toString(), order.userId.toString());
      throw new Error("Expected removeOrder to throw a ContentError");
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.include("Failed to delete order");
    }

    findByIdAndDeleteStub.restore();
  });
});
