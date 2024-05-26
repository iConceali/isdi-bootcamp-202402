// api/controllers/arbitrage/getArbitrageOpportunitiesController.js

import getArbitrageOpportunities from "../../services/arbitrage/getArbitrageOpportunities.js";
import { errors } from "com";

const { NotFoundError } = errors;

const getArbitrageOpportunitiesController = async (req, res, next) => {
  try {
    const opportunities = await getArbitrageOpportunities();
    if (!opportunities) {
      throw new NotFoundError("No opportunities found");
    }
    res.status(200).json(opportunities);
  } catch (error) {
    console.error("Error fetching arbitrage opportunities:", error);
    next(error);
  }
};

export default getArbitrageOpportunitiesController;
