// api/controllers/tests/createUser.spec.js

import dotenv from "dotenv";

import mongoose from "mongoose";
import { expect } from "chai";
import { createUser } from "../../userController.js";
import User from "../../../models/User.js";
import bcrypt from "bcryptjs";

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

  describe("createUser", () => {
    it("should create a new user and retrieve it", async () => {
      const userData = {
        nombre: "Carlos",
        correoElectronico: "carlos@example.com",
        contraseña: "securepassword123",
      };

      const mockReq = { body: userData };
      const mockRes = {
        json: (data) => (mockRes.data = data),
        status: function (code) {
          this.statusCode = code;
          return this;
        },
      };

      await createUser(mockReq, mockRes);
      expect(mockRes.statusCode).to.equal(201);

      const createdUser = await User.findOne({
        correoElectronico: "carlos@example.com",
      });
      expect(createdUser.nombre).to.equal("Carlos");
    });

    it("should return 400 if required fields are missing", async () => {
      const userData = {
        nombre: "Carlos",
        correoElectronico: "",
      };

      const mockReq = { body: userData };
      const mockRes = {
        json: (data) => (mockRes.data = data),
        status: function (code) {
          this.statusCode = code;
          return this;
        },
      };

      await createUser(mockReq, mockRes);
      expect(mockRes.statusCode).to.equal(400);
      expect(mockRes.data.message).to.include("email is required");
    });

    it("should prevent creation of user with duplicate email", async () => {
      await User.create({
        nombre: "Carlos",
        correoElectronico: "carlos@example.com",
        contraseña: "securepassword123",
      });

      const userData = {
        nombre: "Carlosito",
        correoElectronico: "carlos@example.com",
        contraseña: "securepassword456",
      };

      const mockReq = { body: userData };
      const mockRes = {
        json: (data) => (mockRes.data = data),
        status: function (code) {
          this.statusCode = code;
          return this;
        },
      };

      await createUser(mockReq, mockRes);
      expect(mockRes.statusCode).to.equal(400);
      expect(mockRes.data.message).to.include("email already in use");
    });

    it("should handle internal errors when saving a user", async () => {
      const originalSave = User.prototype.save;
      User.prototype.save = () =>
        Promise.reject(new Error("Internal server error"));

      const userData = {
        nombre: "Carlos",
        correoElectronico: "carlos@example.com",
        contraseña: "securepassword123",
      };

      const mockReq = { body: userData };
      const mockRes = {
        json: (data) => (mockRes.data = data),
        status: function (code) {
          this.statusCode = code;
          return this;
        },
      };

      await createUser(mockReq, mockRes);
      expect(mockRes.statusCode).to.equal(500);
      expect(mockRes.data.message).to.include("Internal server error");

      User.prototype.save = originalSave;
    });

    it("should enforce email format", async () => {
      const userData = {
        nombre: "Carlos",
        correoElectronico: "carlosemail.com",
        contraseña: "123qwe123",
      };

      const mockReq = { body: userData };
      const mockRes = {
        json: (data) => (mockRes.data = data),
        status: function (code) {
          this.statusCode = code;
          return this;
        },
      };

      await createUser(mockReq, mockRes);
      expect(mockRes.statusCode).to.equal(400);
      expect(mockRes.data.message).to.include("It is not a valid email!");
    });

    it("should enforce password format", async () => {
      const userData = {
        nombre: "Carlos",
        correoElectronico: "carlos@email.com",
        contraseña: "123",
      };

      const mockReq = { body: userData };
      const mockRes = {
        json: (data) => (mockRes.data = data),
        status: function (code) {
          this.statusCode = code;
          return this;
        },
      };

      await createUser(mockReq, mockRes);
      expect(mockRes.statusCode).to.equal(400);
      expect(mockRes.data.message).to.include(
        "The password must be at least 8 characters"
      );
    });

    it("should not store plain text passwords in the database", async () => {
      const userData = {
        nombre: "Elena",
        correoElectronico: "elena@example.com",
        contraseña: "Password123",
      };

      const mockReq = { body: userData };
      const mockRes = {
        json: (data) => (mockRes.data = data),
        status: function (code) {
          this.statusCode = code;
          return this;
        },
      };

      await createUser(mockReq, mockRes);
      expect(mockRes.statusCode).to.equal(201);
      const storedUser = await User.findOne({
        correoElectronico: "elena@example.com",
      });
      expect(storedUser).to.exist;
      expect(storedUser.contraseña).to.not.equal("Password123");
      const passwordMatch = await bcrypt.compare(
        "Password123",
        storedUser.contraseña
      );
      expect(passwordMatch).to.be.true;
    });
  });
});
