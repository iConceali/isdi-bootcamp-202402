// api/controllers/tests/loginUser.spec.js

import dotenv from "dotenv";
import mongoose from "mongoose";
import { expect } from "chai";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginUser } from "../../userController.js";
import User from "../../../models/User.js";

dotenv.config();

describe("UserController Tests", () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
  });

  after(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("loginUser", () => {
    it("should login a user successfully and return a token", async () => {
      const user = new User({
        nombre: "Test User",
        correoElectronico: "test@example.com",
        contraseña: "password123",
      });
      await user.save();

      const mockReq = {
        body: {
          correoElectronico: "test@example.com",
          contraseña: "password123",
        },
      };
      const mockRes = {
        json: (data) => (mockRes.data = data),
        status: function (code) {
          this.statusCode = code;
          return this;
        },
      };

      await loginUser(mockReq, mockRes);
      expect(mockRes.statusCode).to.equal(200);
      expect(mockRes.data).to.have.property("token");
      expect(
        jwt.verify(mockRes.data.token, process.env.JWT_SECRET)
      ).to.have.property("id", user._id.toString());
    });

    it("should return 404 if the email does not exist", async () => {
      const mockReq = {
        body: {
          correoElectronico: "nonexistent@example.com",
          contraseña: "password123",
        },
      };
      const mockRes = {
        json: (data) => (mockRes.data = data),
        status: function (code) {
          this.statusCode = code;
          return this;
        },
      };

      await loginUser(mockReq, mockRes);
      expect(mockRes.statusCode).to.equal(404);
      expect(mockRes.data.message).to.equal("User not found");
    });

    it("should return 400 if the password is incorrect", async () => {
      const user = new User({
        nombre: "Test User",
        correoElectronico: "test@example.com",
        contraseña: bcrypt.hashSync("password123", 10),
      });
      await user.save();

      const mockReq = {
        body: {
          correoElectronico: "test@example.com",
          contraseña: "wrongpassword",
        },
      };
      const mockRes = {
        json: (data) => (mockRes.data = data),
        status: function (code) {
          this.statusCode = code;
          return this;
        },
      };

      await loginUser(mockReq, mockRes);
      expect(mockRes.statusCode).to.equal(400);
      expect(mockRes.data.message).to.equal("Invalid password");
    });

    it("should handle internal errors during the login process", async () => {
      const originalFindOne = User.findOne;
      User.findOne = () => Promise.reject(new Error("Internal server error"));

      const mockReq = {
        body: {
          correoElectronico: "test@example.com",
          contraseña: "password123",
        },
      };
      const mockRes = {
        json: (data) => (mockRes.data = data),
        status: function (code) {
          this.statusCode = code;
          return this;
        },
      };

      await loginUser(mockReq, mockRes);
      expect(mockRes.statusCode).to.equal(500);
      expect(mockRes.data.message).to.include("Internal server error");

      // Restore the original method after the test
      User.findOne = originalFindOne;
    });
  });
});
