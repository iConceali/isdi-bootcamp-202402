import dotenv from "dotenv";
import mongoose from "mongoose";
import { expect } from "chai";
import { getOpportunities } from "../../technicalIndicatorOpportunitiesController.js";
import TechnicalIndicatorOpportunity from "../../../models/TechnicalIndicatorOpportunity.js";

dotenv.config();

describe("getOpportunities Tests", function () {
  this.timeout(10000); // Aumenta el tiempo de espera para pruebas que involucran la base de datos y API externas

  before(async () => {
    // Conexión a una base de datos de prueba
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // Limpiar la colección de oportunidades antes de cada prueba
    await TechnicalIndicatorOpportunity.deleteMany({});
  });

  it("should retrieve all technical indicator opportunities successfully", async () => {
    // Crear algunas oportunidades de ejemplo en la base de datos
    await TechnicalIndicatorOpportunity.create({
      symbol: "BTCUSDT",
      strategy: "RSI & Stochastic",
      message: "Potential buy opportunity",
      rsi: 30,
      stochastic: 20,
    });

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

    await getOpportunities(null, mockRes);
    expect(mockRes.statusCode).to.equal(200);
    expect(mockRes.data).to.be.an("array");
    expect(mockRes.data[0].symbol).to.equal("BTCUSDT");
  });

  it("should handle errors when fetching opportunities", async () => {
    // Simular un error de base de datos forzando un error en el modelo
    const originalFind = TechnicalIndicatorOpportunity.find;
    TechnicalIndicatorOpportunity.find = () =>
      Promise.reject(new Error("Database error"));

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

    await getOpportunities(null, mockRes);
    expect(mockRes.statusCode).to.equal(500);
    expect(mockRes.data.message).to.include(
      "Error al obtener las oportunidades técnicas"
    );

    // Restaurar la función original después de la prueba
    TechnicalIndicatorOpportunity.find = originalFind;
  });
});
