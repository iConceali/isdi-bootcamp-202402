// api/controllers/tests/tradeController.spec.js

import dotenv from "dotenv";
import mongoose from "mongoose";
import { expect } from "chai";
import { deleteTrade } from "../../tradeController.js";
import User from "../../../models/User.js";
import Trade from "../../../models/TradeModel.js";

dotenv.config();

describe("TradeController Tests for deleteTrade", () => {
  let user, anotherUser, trade;

  before(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
  });

  after(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await Trade.deleteMany({});

    // Crear usuarios y un trade
    user = await User.create({
      nombre: "Trade Owner",
      correoElectronico: "owner@example.com",
      contraseña: "secure1234",
    });

    anotherUser = await User.create({
      nombre: "Another User",
      correoElectronico: "another@example.com",
      contraseña: "password1234",
    });

    trade = await Trade.create({
      userId: user._id,
      symbol: "AAPL",
      date: new Date(),
      investment: 1000,
      profitPercent: 10,
      profitDollars: 100,
    });
  });

  it("should delete a trade successfully", async () => {
    const mockReq = {
      params: { id: trade._id },
      user: { id: user._id.toString() }, // Authenticating as the trade owner
    };
    const mockRes = {
      json(data) {
        this.data = data;
        return this;
      },
      status(code) {
        this.statusCode = code;
        return this;
      },
    };

    await deleteTrade(mockReq, mockRes);
    expect(mockRes.statusCode).to.equal(200);
    expect(mockRes.data.message).to.equal("Trade deleted successfully");
  });

  it("should return 404 if the trade does not exist", async () => {
    const mockReq = {
      params: { id: new mongoose.Types.ObjectId() },
      user: { id: user._id.toString() },
    };
    const mockRes = {
      json(data) {
        this.data = data;
        return this;
      },
      status(code) {
        this.statusCode = code;
        return this;
      },
    };

    await deleteTrade(mockReq, mockRes);
    expect(mockRes.statusCode).to.equal(404);
    expect(mockRes.data.message).to.equal("Trade not found");
  });

  it("should return 403 if the user is not authorized to delete the trade", async () => {
    const mockReq = {
      params: { id: trade._id },
      user: { id: anotherUser._id.toString() }, // Another user trying to delete the trade
    };
    const mockRes = {
      json(data) {
        this.data = data;
        return this;
      },
      status(code) {
        this.statusCode = code;
        return this;
      },
    };

    await deleteTrade(mockReq, mockRes);
    expect(mockRes.statusCode).to.equal(403);
    expect(mockRes.data.message).to.equal(
      "Not authorized to delete this trade"
    );
  });

  it("should handle server errors during the delete process", async () => {
    const originalFindByIdAndDelete = Trade.findByIdAndDelete;
    Trade.findByIdAndDelete = () => Promise.reject(new Error("Database error"));

    const mockReq = {
      params: { id: trade._id },
      user: { id: user._id.toString() },
    };
    const mockRes = {
      json(data) {
        this.data = data;
        return this;
      },
      status(code) {
        this.statusCode = code;
        return this;
      },
    };

    await deleteTrade(mockReq, mockRes);
    expect(mockRes.statusCode).to.equal(500);
    expect(mockRes.data.message).to.include("Database error");

    // Restore the original method
    Trade.findByIdAndDelete = originalFindByIdAndDelete;
  });
});
