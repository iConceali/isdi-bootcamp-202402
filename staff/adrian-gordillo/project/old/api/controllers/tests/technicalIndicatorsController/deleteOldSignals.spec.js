import dotenv from "dotenv";
import { expect } from "chai";
import mongoose from "mongoose";
import { deleteOldSignals } from "../../technicalIndicatorsController.js";
import TechnicalIndicatorOpportunity from "../../../models/TechnicalIndicatorOpportunity.js";

dotenv.config();

describe("deleteOldSignals Tests", () => {
  before(async () => {
    // Asegúrate de que la conexión a la base de datos está establecida antes de ejecutar las pruebas
    await mongoose.connect(process.env.MONGO_URI_TEST);
  });

  after(async () => {
    // Cierra la conexión a la base de datos después de completar todas las pruebas
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // Limpia la colección antes de cada prueba para evitar contaminación de datos entre pruebas
    await TechnicalIndicatorOpportunity.deleteMany({});
  });

  describe("deleteOldSignals", () => {
    it("should delete all signals", async () => {
      // Crear algunos registros de señales para probar su eliminación
      await TechnicalIndicatorOpportunity.create([
        {
          symbol: "BTCUSDT",
          strategy: "RSI",
          message: "Buy",
          rsi: 30,
          stochastic: 20,
        },
        {
          symbol: "ETHUSDT",
          strategy: "Stochastic",
          message: "Sell",
          rsi: 60,
          stochastic: 80,
        },
      ]);

      // Ejecuta la función que se está probando
      await deleteOldSignals();

      // Verificar que no queden registros después de ejecutar la función
      const signals = await TechnicalIndicatorOpportunity.find({});
      expect(signals.length).to.equal(0);
    });

    it("should handle errors gracefully", async () => {
      // Simular un error en la operación de la base de datos
      const originalDeleteMany = TechnicalIndicatorOpportunity.deleteMany;
      TechnicalIndicatorOpportunity.deleteMany = () =>
        Promise.reject(new Error("Database failure"));

      try {
        await deleteOldSignals();
      } catch (error) {
        // Verificar que se maneja correctamente el error sin detener la ejecución
        expect(error.message).to.include("Database failure");
      } finally {
        // Restaurar la función original después de la prueba
        TechnicalIndicatorOpportunity.deleteMany = originalDeleteMany;
      }
    });
  });
});
