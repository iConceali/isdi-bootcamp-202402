// api/services/arbitrage/standard/detectStandardArbitrage.js

import Opportunity from "../../../models/Opportunity.js";
import getArbitrageConfig from "./getArbitrageConfig.js";
import calculateStandardOpportunities from "./calculateStandardOpportunities.js";
import { errors, validate } from "com";

const { SystemError, ContentError } = errors;

// Ejecuta el proceso completo de detección de arbitraje estándar
const detectStandardArbitrage = async () => {
  try {
    // Obtener la configuración de arbitraje
    const config = getArbitrageConfig();

    // Validar la configuración
    validate.number(config.umbralRentabilidad, "umbralRentabilidad");
    for (const [exchange, commission] of Object.entries(config.comisiones)) {
      validate.number(commission, `commission for ${exchange}`);
    }
    config.paresCriptomonedas.forEach((pair) => validate.text(pair, "pair"));

    // Limpiar oportunidades antiguas antes de buscar nuevas
    await Opportunity.deleteMany({ type: "standard" });

    // Calcular nuevas oportunidades de arbitraje
    const opportunities = await calculateStandardOpportunities(config);

    // Guardar nuevas oportunidades en la base de datos
    if (opportunities.length > 0) {
      await Opportunity.insertMany(
        opportunities.map((op) => ({ ...op, type: "standard" }))
      );
    }

    // No sanitizar aquí; la sanitización se hará al obtener las oportunidades desde la base de datos
    return opportunities;
  } catch (error) {
    if (error instanceof ContentError) {
      console.error("Validation error:", error.message);
      throw error;
    } else {
      console.error("Error detecting standard arbitrage:", error.message);
      throw new SystemError("Failed to detect standard arbitrage");
    }
  }
};

export default detectStandardArbitrage;
