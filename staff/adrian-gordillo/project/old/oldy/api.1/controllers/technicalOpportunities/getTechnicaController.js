// api/controllers/technicalIndicators/getTechnicalController.js

import getTechnicalOpportunities from "../../services/technicalIndicators/getTechnicalOpportunities.js";
import { errors } from "com";

const { SystemError } = errors;

/**
 * Controlador para obtener oportunidades técnicas
 */
const getTechnicalController = async (req, res, next) => {
  try {
    const opportunities = await getTechnicalOpportunities();
    res.status(200).json(opportunities);
  } catch (error) {
    if (error instanceof SystemError) {
      res.status(500).json({ error: error.message });
    } else {
      next(error);
    }
  }
};

export default getTechnicalController;
