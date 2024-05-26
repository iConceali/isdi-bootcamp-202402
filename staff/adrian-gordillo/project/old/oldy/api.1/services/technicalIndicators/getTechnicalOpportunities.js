// api/services/technicalIndicators/getTechnicalOpportunities.js

import TechnicalOpportunity from "../../models/TechnicalOpportunity.js";
import { errors } from "com";

const { SystemError } = errors;

/**
 * Servicio para obtener oportunidades técnicas
 */
const getTechnicalOpportunities = async () => {
  try {
    return await TechnicalOpportunity.find();
  } catch (error) {
    console.error("Error fetching technical opportunities:", error.message);
    throw new SystemError("Failed to fetch technical opportunities");
  }
};

export default getTechnicalOpportunities;
