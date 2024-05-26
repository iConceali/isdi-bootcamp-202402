// api/controllers/technicalIndicators/detectTechnicalController.js

import detectTechnicalIndicators from "../../services/technicalIndicators/detectTechnicalIndicators.js";
import { errors } from "com";

const { SystemError, ContentError } = errors;

/**
 * Controlador para detectar indicadores técnicos
 */
const detectTechnicalController = async (req, res, next) => {
  try {
    const opportunities = await detectTechnicalIndicators();
    res.status(200).json(opportunities);
  } catch (error) {
    if (error instanceof SystemError || error instanceof ContentError) {
      res.status(500).json({ error: error.message });
    } else {
      next(error);
    }
  }
};

export default detectTechnicalController;
