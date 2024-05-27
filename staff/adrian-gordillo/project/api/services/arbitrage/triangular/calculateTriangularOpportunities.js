// api/services/arbitrage/triangular/calculateTriangularOpportunities.js

import fetchSymbolPrices from "./fetchSymbolPrices.js";
import { errors, validate } from "com";

const { ContentError, SystemError } = errors;

// Calcula oportunidades de arbitraje triangular para un triángulo específico de criptomonedas

const calculateTriangularOpportunities = async (triangle) => {
  try {
    // Obtener precios de los símbolos de criptomonedas
    const tickers = await Promise.all(triangle.map(fetchSymbolPrices));

    // Si falta algún precio, saltar este triángulo
    if (tickers.some((ticker) => !ticker)) {
      return [];
    }

    // Inicializar las variables de cálculo
    let startingAmount = 1000; // Cantidad inicial en USD
    let currentAmount = startingAmount; // Cantidad actual durante las iteraciones
    const trades = []; // Lista para almacenar los detalles de los trades

    // Calcular el monto de trade para cada ticker en el triángulo
    for (let i = 0; i < tickers.length; i++) {
      const ticker = tickers[i];
      const parts = /^(\w+)(USD|USDT|ETH|BTC)$/.exec(triangle[i]);
      if (!parts) continue; // Si no se puede parsear el símbolo, continuar con el siguiente

      const tradeAmount =
        i === tickers.length - 1
          ? currentAmount * ticker.bidPrice // Si es el último, usar el precio de venta
          : currentAmount / ticker.askPrice; // Si no, usar el precio de compra

      trades.push({ from: parts[1], to: parts[2], amount: tradeAmount });
      currentAmount = tradeAmount; // Actualizar la cantidad actual
    }

    // Calcular la ganancia neta y el porcentaje de ganancia
    const profit = currentAmount - startingAmount;
    const profitPercentage = (profit / startingAmount) * 100;

    // Validar el cálculo de la ganancia
    validate.number(profitPercentage, "profitPercentage");

    const umbralRentabilidad = 0.02;

    validate.number(umbralRentabilidad, "umbralRentabilidad");

    // Si la ganancia porcentual es mayor que el umbral, retornar la oportunidad de arbitraje
    if (profitPercentage > umbralRentabilidad) {
      return [
        {
          type: "triangular",
          success: true,
          profit: profitPercentage,
          trades,
          exchange: "Binance",
        },
      ];
    }

    // Si la ganancia porcentual no es suficiente, retornar un array vacío
    return [];
  } catch (error) {
    if (error instanceof ContentError) {
      console.error(`Validation error: ${error.message}`);
      throw error;
    } else {
      throw new SystemError(
        `Error processing triangular opportunities: ${error.message}`
      );
    }
  }
};

export default calculateTriangularOpportunities;
