// api/controllers/tests/updateDeposit.spec.js

import dotenv from "dotenv";
import mongoose from "mongoose";
import { expect } from "chai";
import { updateDeposit } from "../../userController.js";
import User from "../../../models/User.js";

dotenv.config();

describe("updateDeposit Tests", () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
  });

  after(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("updateDeposit", () => {
    it("should update the deposit successfully", async () => {
      const user = await User.create({
        nombre: "Test User",
        correoElectronico: "test@example.com",
        contraseña: "secure1234",
        deposit: [50],
      });

      const mockReq = {
        user: { id: user._id },
        body: { deposit: 100 },
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

      await updateDeposit(mockReq, mockRes);
      expect(mockRes.statusCode).to.equal(200);
      expect(mockRes.data.message).to.equal("Deposit updated successfully");

      const updatedUser = await User.findById(user._id);
      expect(updatedUser.deposit).to.deep.equal([100]);
    });

    it("should return 404 if the user does not exist", async () => {
      const mockReq = {
        user: { id: new mongoose.Types.ObjectId() },
        body: { deposit: 100 },
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

      await updateDeposit(mockReq, mockRes);
      expect(mockRes.statusCode).to.equal(404);
      expect(mockRes.data.message).to.equal("User not found");
    });

    it("should handle errors during the update process", async () => {
      const user = await User.create({
        nombre: "Test User",
        correoElectronico: "test@example.com",
        contraseña: "secure1234",
        deposit: [50],
      });

      const originalSave = User.prototype.save;
      User.prototype.save = () => Promise.reject(new Error("Database error"));

      const mockReq = {
        user: { id: user._id },
        body: { deposit: 100 },
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

      await updateDeposit(mockReq, mockRes);
      expect(mockRes.statusCode).to.equal(500);
      expect(mockRes.data.message).to.include("Failed to update deposit");

      User.prototype.save = originalSave; // Restore the original save method
    });
  });
});
