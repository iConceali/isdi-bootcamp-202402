// api/controllers/userController.spec.js

import dotenv from "dotenv";
import mongoose from "mongoose";
import { expect } from "chai";
import { getAllUsers } from "../../userController.js";
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
    await User.deleteMany({}); // Limpia la colección de usuarios antes de cada prueba
  });

  describe("getAllUsers", () => {
    it("should retrieve all users successfully", async () => {
      // Preparar datos de prueba
      await User.create({
        nombre: "Alice",
        correoElectronico: "alice@example.com",
        contraseña: "password123",
      });
      await User.create({
        nombre: "Bob",
        correoElectronico: "bob@example.com",
        contraseña: "password456",
      });

      const mockReq = {}; // En este caso, no necesitamos modificar nada en el request
      const mockRes = {
        data: null,
        statusCode: null,
        json(data) {
          this.data = data;
          return this;
        },
        status(code) {
          this.statusCode = code;
          return this;
        },
      };

      await getAllUsers(mockReq, mockRes);
      expect(mockRes.statusCode).to.equal(200);
      expect(mockRes.data.length).to.equal(2);
      expect(mockRes.data[0].nombre).to.equal("Alice");
      expect(mockRes.data[1].nombre).to.equal("Bob");
    });

    it("should handle errors when fetching users fails", async () => {
      // Simulación de fallo en la base de datos
      const originalFind = User.find;
      User.find = () => Promise.reject(new Error("Failed to fetch users"));

      const mockReq = {};
      const mockRes = {
        data: null,
        statusCode: null,
        json(data) {
          this.data = data;
          return this;
        },
        status(code) {
          this.statusCode = code;
          return this;
        },
      };

      await getAllUsers(mockReq, mockRes);
      expect(mockRes.statusCode).to.equal(500);
      expect(mockRes.data.message).to.include("Error fetching users");

      // Restaurar la función original después de la prueba
      User.find = originalFind;
    });
  });
});
