// api/services/arbitrage/triangular/detectTriangularArbitrage.js

import Opportunity from "../../../models/Opportunity.js";
import calculateTriangularOpportunities from "./calculateTriangularOpportunities.js";
import { errors, validate } from "com";

const { SystemError, ContentError } = errors;

// Ejecuta el proceso completo de detección de arbitraje triangular

const detectTriangularArbitrage = async () => {
  try {
    // Limpiar oportunidades antiguas antes de buscar nuevas
    await Opportunity.deleteMany({ type: "triangular" });

    // Lista de posibles triángulos de criptomonedas
    const triangles = [
      ["BTCUSDT", "ETHBTC", "ETHUSDT"],
      ["BTCUSDT", "BNBBTC", "BNBUSDT"],
      ["ETHUSDT", "BNBETH", "BNBUSDT"],
      ["BTCUSDT", "ADABTC", "ADAUSDT"],
      ["BTCUSDT", "XRPBTC", "XRPUSDT"],
      ["BTCUSDT", "LTCBTC", "LTCUSDT"],
      ["ETHBTC", "XRPETH", "XRPBTC"],
      ["BTCUSDT", "DOTBTC", "DOTUSDT"],
      ["ETHUSDT", "LINKETH", "LINKUSDT"],
      ["BTCUSDT", "DOGEUSDT", "DOGEBTC"],
      ["ETHUSDT", "AAVEETH", "AAVEUSDT"],
      ["BTCUSDT", "UNIBTC", "UNIUSDT"],
      ["ETHBTC", "LTCETH", "LTCBTC"],
      ["BTCUSDT", "VETBTC", "VETUSDT"],
      ["ETHBTC", "MANAETH", "MANABTC"],
      ["BTCUSDT", "FILBTC", "FILUSDT"],
      ["ETHBTC", "ATOMETH", "ATOMBTC"],
      ["BTCUSDT", "CAKEBTC", "CAKEUSDT"],
      ["ETHBTC", "XLMETH", "XLMBTC"],
      ["BTCUSDT", "MATICBTC", "MATICUSDT"],
    ];

    // Validar la estructura de los triángulos
    triangles.forEach((triangle) => {
      triangle.forEach((symbol) => validate.text(symbol, "symbol"));
    });

    const allArbitrageOpportunities = [];

    for (const triangle of triangles) {
      // Calcular oportunidades de arbitraje triangular para el triángulo actual
      const opportunities = await calculateTriangularOpportunities(triangle);
      allArbitrageOpportunities.push(...opportunities);
    }

    // Guardar nuevas oportunidades en la base de datos
    if (allArbitrageOpportunities.length > 0) {
      await Opportunity.insertMany(allArbitrageOpportunities);
    }

    return allArbitrageOpportunities;
  } catch (error) {
    if (error instanceof ContentError) {
      console.error("Validation error:", error.message);
    } else {
      console.error("Error detecting triangular arbitrage:", error.message);
    }
    throw new SystemError("Failed to detect triangular arbitrage");
  }
};

export default detectTriangularArbitrage;
