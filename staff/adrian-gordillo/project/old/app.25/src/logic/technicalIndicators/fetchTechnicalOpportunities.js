// app/src/logic/technicalIndicators/fetchTechnicalOpportunities.js

import axios from "axios";
import { validate, errors } from "com";
const { ContentError, SystemError } = errors;

// Función para obtener oportunidades técnicas desde la API
const fetchTechnicalOpportunities = async () => {
  try {
    const apiUrl = `${
      import.meta.env.VITE_API_URL
    }/technical-opportunities/technical-opportunities`;
    validate.url(apiUrl, "API URL");

    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch technical opportunities:", error);
    if (error.response) {
      // Error con respuesta de la API
      throw new ContentError(
        "Failed to fetch opportunities due to an error: " +
          error.response.data.message
      );
    } else if (error.request) {
      // Error sin respuesta de la API
      throw new SystemError(
        "Failed to fetch opportunities. No response from server."
      );
    } else {
      // Otro tipo de error
      throw new SystemError("An unexpected error occurred: " + error.message);
    }
  }
};

export default fetchTechnicalOpportunities;
