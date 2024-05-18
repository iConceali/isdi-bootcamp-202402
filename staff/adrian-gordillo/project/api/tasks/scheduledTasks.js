// scheduledTasks.js

import detectStandardArbitrage from "../services/arbitrage/standard/detectStandardArbitrage.js";
import detectTriangularArbitrage from "../services/arbitrage/triangular/detectTriangularArbitrage.js";
import detectTechnicalIndicators from "../services/technicalIndicators/detectTechnicalIndicators.js";

export function setupScheduledTasks() {
  // Buscar oportunidades de arbitraje estándar y triangular cada 10 segundos
  setInterval(async () => {
    console.log("Buscando nuevas oportunidades de arbitraje...");
    try {
      const standardOpportunities = await detectStandardArbitrage();
      console.log(
        "Oportunidades de arbitraje estándar encontradas:",
        standardOpportunities
      );
    } catch (error) {
      console.error(
        "Error al buscar oportunidades de arbitraje estándar:",
        error.message
      );
    }

    try {
      const triangularOpportunities = await detectTriangularArbitrage();
      console.log(
        "Oportunidades de arbitraje triangular encontradas:",
        triangularOpportunities
      );
    } catch (error) {
      console.error(
        "Error al buscar oportunidades de arbitraje triangular:",
        error.message
      );
    }
  }, 10000);

  // Buscar oportunidades basadas en indicadores técnicos cada minuto
  setInterval(async () => {
    try {
      console.log("Buscando nuevas oportunidades con indicadores técnicos...");
      const technicalOpportunities = await detectTechnicalIndicators();
      console.log(
        "Oportunidades con indicadores técnicos encontradas:",
        technicalOpportunities
      );
    } catch (error) {
      console.error(
        "Error al buscar oportunidades con indicadores técnicos:",
        error.message
      );
    }
  }, 60000);
}
