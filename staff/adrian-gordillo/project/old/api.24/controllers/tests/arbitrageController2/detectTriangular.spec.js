import dotenv from "dotenv";
import mongoose from "mongoose";
import { expect } from "chai";
import { detectTriangular } from "../../arbitrageTriangularController.js";
import Opportunity from "../../../models/Opportunity.js";

dotenv.config();

describe("detectTriangular Tests", function () {
  this.timeout(15000); // Ajustando el tiempo límite para operaciones asíncronas

  before(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
  });

  after(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await Opportunity.deleteMany({ type: "triangular" }); // Limpiar la colección antes de cada prueba
  });

  it("should detect and save triangular arbitrage opportunities", async () => {
    const mockReq = {};
    const mockRes = {
      data: null,
      statusCode: null,
      json: function (data) {
        this.data = data; // Almacena datos para verificación
        return this;
      },
      status: function (code) {
        this.statusCode = code; // Almacena el código de estado para verificación
        return this;
      },
    };

    await detectTriangular(mockReq, mockRes);
    expect(mockRes.statusCode).to.equal(200);
    expect(mockRes.data).to.be.an("object");
    expect(mockRes.data.message).to.equal("Detection complete"); // Verificar que el mensaje es correcto
  });

  it("should handle no arbitrage opportunities gracefully", async () => {
    const mockReq = {};
    const mockRes = {
      data: null,
      statusCode: null,
      json: function (data) {
        this.data = data;
        return this;
      },
      status: function (code) {
        this.statusCode = code;
        return this;
      },
    };

    await detectTriangular(mockReq, mockRes);
    expect(mockRes.statusCode).to.equal(200); // Verifica que la respuesta es 200 incluso cuando no hay oportunidades
    expect(mockRes.data).to.be.an("object"); // Verifica que la respuesta es un objeto
    expect(mockRes.data.message).to.equal("Detection complete"); // Verifica que el mensaje indica completitud
  });
});
