// api/controllers/tests/tradeController/getTrades.spec.js

import dotenv from "dotenv";
import mongoose from "mongoose";
import { expect } from "chai";
import { getTrades } from "../../tradeController.js";
import User from "../../../models/User.js";
import Trade from "../../../models/TradeModel.js";

dotenv.config();

describe("getTrades Tests", () => {
  let user; // Declarar `user` aquí para asegurarse de que es accesible en todas las pruebas dentro de este bloque.

  before(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
  });

  after(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await User.deleteMany({}); // Asegura que no haya usuarios duplicados
    await Trade.deleteMany({});
    user = await User.create({
      nombre: "Test User",
      correoElectronico: "test@example.com",
      contraseña: "secure1234",
    });
  });

  describe("getTrades", () => {
    it("should retrieve trades successfully", async () => {
      const trades = [
        {
          userId: user._id,
          symbol: "AAPL",
          date: new Date(),
          investment: 1000,
          profitPercent: 10,
          profitDollars: 100,
        },
        {
          userId: user._id,
          symbol: "MSFT",
          date: new Date(),
          investment: 2000,
          profitPercent: 20,
          profitDollars: 400,
        },
      ];
      await Trade.insertMany(trades);

      const mockReq = { user: { id: user._id } };
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

      await getTrades(mockReq, mockRes);
      expect(mockRes.statusCode).to.equal(200);
      expect(mockRes.data.length).to.equal(2);
      expect(mockRes.data[0].symbol).to.equal("AAPL");
      expect(mockRes.data[1].symbol).to.equal("MSFT");
    });

    it("should handle errors during the fetch process", async () => {
      const mockReq = { user: { id: user._id } };
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

      // Simulate a database error
      const originalFind = Trade.find;
      Trade.find = () => Promise.reject(new Error("Database error"));

      await getTrades(mockReq, mockRes);
      expect(mockRes.statusCode).to.equal(500);
      expect(mockRes.data.message).to.include("Database error");

      // Restore original function
      Trade.find = originalFind;
    });
  });
});
