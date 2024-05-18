// api/controllers/tests/tradeController.spec.js

import dotenv from "dotenv";
import mongoose from "mongoose";
import { expect } from "chai";
import { addTrade } from "../../tradeController.js";
import User from "../../../models/User.js";
import Trade from "../../../models/TradeModel.js";

dotenv.config();

describe("addTrade Tests", () => {
  let user;

  before(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
  });

  after(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await Trade.deleteMany({});
    user = await User.create({
      nombre: "Trade User",
      correoElectronico: "trade@example.com",
      contraseña: "secureTrade1234",
    });
  });

  describe("addTrade", () => {
    it("should successfully add a trade", async () => {
      const tradeData = {
        symbol: "AAPL",
        date: new Date(),
        investment: 1000,
        profitPercent: 10,
      };

      const mockReq = {
        user: { id: user._id },
        body: tradeData,
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

      await addTrade(mockReq, mockRes);
      expect(mockRes.statusCode).to.equal(201);
      expect(mockRes.data).to.include({
        symbol: "AAPL",
        investment: 1000,
        profitPercent: 10,
        profitDollars: 100, // Expected calculated value
      });
    });

    it("should return an error if required fields are missing", async () => {
      const tradeData = {
        date: new Date(),
        investment: 1000,
        // missing symbol and profitPercent
      };

      const mockReq = {
        user: { id: user._id },
        body: tradeData,
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

      await addTrade(mockReq, mockRes);
      expect(mockRes.statusCode).to.equal(400);
      expect(mockRes.data.message).to.include("symbol");
      expect(mockRes.data.message).to.include("profitPercent");
    });

    it("should handle database errors during trade save", async () => {
      const tradeData = {
        symbol: "AAPL",
        date: new Date(),
        investment: 1000,
        profitPercent: 10,
      };

      const originalSave = Trade.prototype.save;
      Trade.prototype.save = () => Promise.reject(new Error("Database error"));

      const mockReq = {
        user: { id: user._id },
        body: tradeData,
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

      await addTrade(mockReq, mockRes);
      expect(mockRes.statusCode).to.equal(400);
      expect(mockRes.data.message).to.include("Database error");

      Trade.prototype.save = originalSave; // Restore original save method
    });
  });
});
