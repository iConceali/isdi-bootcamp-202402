// api/controllers/arbitrage/detectStandardArbitrageController.js

import detectStandardArbitrage from "../../services/arbitrage/standard/detectStandardArbitrage.js";
import { errors } from "com";

const { SystemError } = errors;

const detectStandardArbitrageController = async (req, res, next) => {
  try {
    const opportunities = await detectStandardArbitrage();
    if (res && res.status) {
      res.status(200).json(opportunities);
    } else {
      return opportunities;
    }
  } catch (error) {
    if (error instanceof SystemError) {
      if (res && res.status) {
        res.status(500).json({ error: error.message });
      } else {
        console.error("Error:", error.message);
      }
    } else {
      if (typeof next === "function") {
        next(error);
      } else {
        console.error("Unhandled error:", error);
      }
    }
  }
};

export default detectStandardArbitrageController;
