// api/services/arbitrage/standard/retrieveCryptoPrice.js

import axios from "axios"; // Importa axios para realizar peticiones HTTP
import { symbolMappings } from "./symbolMappings.js"; // Importa mappings de símbolos
import { errors, validate } from "com"; // Importa errores y validaciones desde "com"

const { SystemError, ContentError } = errors; // Extrae errores específicos

const retrieveCryptoPrice = async (exchange, standardSymbol, commission) => {
  // Define función asincrónica para recuperar precios de criptomonedas
  try {
    const symbol = symbolMappings[standardSymbol]?.[exchange.name]; // Mapea símbolo estándar al símbolo del exchange
    if (!symbol) {
      // Si no se encuentra el símbolo, lanza un error
      throw new ContentError(
        `No symbol mapping found for ${standardSymbol} on ${exchange.name}.`
      );
    }

    const url = `${exchange.url}${symbol}${exchange.endpointSuffix || ""}`; // Construye la URL para la petición
    const response = await axios.get(url); // Realiza la petición HTTP
    const { bid, ask } = exchange.format(response.data); // Formatea la respuesta

    validate.number(bid, "bid price"); // Valida el precio bid
    validate.number(ask, "ask price"); // Valida el precio ask

    return {
      exchange: exchange.name, // Nombre del exchange
      symbol: standardSymbol, // Símbolo estándar
      bid: bid * (1 - commission / 100), // Calcula el bid con comisión
      ask: ask * (1 + commission / 100), // Calcula el ask con comisión
    };
  } catch (error) {
    // Maneja errores
    if (error instanceof ContentError) {
      // Si el error es de contenido
      console.error(`Validation error: ${error.message}`); // Log del error
      throw error; // Lanza el error
    } else {
      console.error(
        `Error fetching price from ${exchange.name} for ${standardSymbol}: ${error.message}`
      ); // Log del error
      throw new SystemError(
        `Failed to retrieve price for ${standardSymbol} from ${exchange.name}`
      ); // Lanza un error del sistema
    }
  }
};

export default retrieveCryptoPrice; // Exporta la función por defecto
