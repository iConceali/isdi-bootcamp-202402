// api/services/technicalIndicators/getTechnicalOpportunities.js

import TechnicalOpportunity from "../../models/TechnicalOpportunity.js";
import { errors } from "com";

const { SystemError, NotFoundError } = errors;

/**
 * Servicio para obtener oportunidades técnicas
 */
const getTechnicalOpportunities = async () => {
  try {
    const opportunities = await TechnicalOpportunity.find().lean();
    if (!opportunities || opportunities.length === 0) {
      throw new NotFoundError("No opportunities found");
    }

    // Sanitizar las oportunidades
    const sanitizedOpportunities = opportunities.map((op) => {
      const { _id, __v, ...rest } = op;
      return {
        id: _id.toString(),
        ...rest,
      };
    });

    return sanitizedOpportunities;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error; // Propagar el NotFoundError
    }
    console.error("Error fetching technical opportunities:", error.message);
    throw new SystemError("Failed to fetch technical opportunities");
  }
};

export default getTechnicalOpportunities;
