// api/services/arbitrage/standard/calculateStandardOpportunities.js

import retrieveCryptoPrice from "./retrieveCryptoPrice.js"; // Importa la función para recuperar precios de criptomonedas
import { exchanges } from "./symbolMappings.js"; // Importa los mappings de los exchanges
import { errors, validate } from "com"; // Importa errores y validaciones desde "com"

const { ContentError, SystemError } = errors; // Extrae errores específicos

// Calcula oportunidades de arbitraje estándar comparando precios entre exchanges
const calculateStandardOpportunities = async (config) => {
  const { umbralRentabilidad, comisiones, paresCriptomonedas } = config;

  try {
    // Obtener precios de criptomonedas desde diferentes exchanges
    const prices = await Promise.all(
      paresCriptomonedas
        .map((pair) =>
          exchanges.map((exchange) =>
            retrieveCryptoPrice(
              exchange,
              pair,
              config.includeCommissions ? comisiones[exchange.name] : 0
            )
          )
        )
        .flat()
    );

    // Filtrar precios válidos
    const validPrices = prices.filter((price) => price !== null);
    const opportunities = [];

    // Calcular oportunidades de arbitraje
    for (const buy of validPrices) {
      for (const sell of validPrices) {
        if (buy.exchange !== sell.exchange && buy.symbol === sell.symbol) {
          const potentialProfitPercentage =
            ((sell.bid - buy.ask) / buy.ask) * 100 -
            (config.includeCommissions
              ? (buy.ask * comisiones[buy.exchange]) / 100 +
                (sell.bid * comisiones[sell.exchange]) / 100
              : 0);

          // Validar los cálculos
          validate.number(
            potentialProfitPercentage,
            "potentialProfitPercentage"
          );

          // Si la ganancia potencial supera el umbral de rentabilidad, agregar oportunidad
          if (potentialProfitPercentage > umbralRentabilidad) {
            opportunities.push({
              symbol: buy.symbol,
              buyExchange: buy.exchange,
              buyPrice: buy.ask,
              sellExchange: sell.exchange,
              sellPrice: sell.bid,
              profit: potentialProfitPercentage,
            });
          }
        }
      }
    }

    return opportunities;
  } catch (error) {
    if (error instanceof ContentError) {
      console.error(`Validation error: ${error.message}`); // Log del error
      throw error; // Lanza el error
    } else {
      throw new SystemError(`Error processing opportunities: ${error.message}`); // Lanza un error del sistema
    }
  }
};

export default calculateStandardOpportunities; // Exporta la función por defecto
