// api/controllers/arbitrage/detectTriangularArbitrageController.js

import detectTriangularArbitrage from "../../services/arbitrage/triangular/detectTriangularArbitrage.js";
import { errors } from "com";

const { SystemError } = errors;

const detectTriangularArbitrageController = async (req, res, next) => {
  try {
    const opportunities = await detectTriangularArbitrage();
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

export default detectTriangularArbitrageController;
