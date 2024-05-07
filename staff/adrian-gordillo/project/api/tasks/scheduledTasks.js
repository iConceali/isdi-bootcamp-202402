import { detectStandard } from "../controllers/arbitrageStandardController.js";
import { detectTriangular } from "../controllers/arbitrageTriangularController.js";
import { detectTechnicalIndicators } from "../controllers/technicalIndicatorOpportunitiesController.js";

export function setupScheduledTasks() {
  // Buscar oportunidades de arbitraje estándar y triangular cada 10 segundos
  setInterval(async () => {
    console.log("Buscando nuevas oportunidades de arbitraje...");
    await detectStandard();
    await detectTriangular();
  }, 10000);

  // Buscar oportunidades basadas en indicadores técnicos cada minuto
  setInterval(async () => {
    console.log("Buscando nuevas oportunidades con indicadores técnicos...");
    await detectTechnicalIndicators(null); // Asumiendo que esta función puede manejar 'null' como argumento
  }, 60000);
}
