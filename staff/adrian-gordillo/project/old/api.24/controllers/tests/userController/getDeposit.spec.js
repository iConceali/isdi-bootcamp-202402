// api/controllers/tests/getDeposit.spec.js

import dotenv from "dotenv";
import mongoose from "mongoose";
import { expect } from "chai";
import { getDeposit } from "../../userController.js";
import User from "../../../models/User.js";

dotenv.config();

describe("getDeposit Tests", () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
  });

  after(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("getDeposit", () => {
    it("should retrieve the deposit successfully", async () => {
      const user = await User.create({
        nombre: "Alice",
        correoElectronico: "alice@example.com",
        contraseña: "password123",
        deposit: [100],
      });

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

      await getDeposit(mockReq, mockRes);
      expect(mockRes.statusCode).to.equal(200);
      expect(mockRes.data.deposit).to.deep.equal([100]);
    });

    it("should return 404 if the user does not exist", async () => {
      const mockReq = { user: { id: new mongoose.Types.ObjectId() } }; // Non-existing ID
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

      await getDeposit(mockReq, mockRes);
      expect(mockRes.statusCode).to.equal(404);
      expect(mockRes.data.message).to.equal("User not found");
    });

    it("should handle errors during the fetch process", async () => {
      const originalFindById = User.findById;
      User.findById = () => Promise.reject(new Error("Database error"));

      const mockReq = { user: { id: "12345" } };
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

      await getDeposit(mockReq, mockRes);
      expect(mockRes.statusCode).to.equal(500);
      expect(mockRes.data.message).to.include("Database error");

      // Restore the original method after the test
      User.findById = originalFindById;
    });
  });
});
