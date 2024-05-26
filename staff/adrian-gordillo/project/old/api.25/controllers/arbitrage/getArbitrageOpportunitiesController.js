// api/controllers/arbitrage/getArbitrageOpportunitiesController.js

import Opportunity from "../../models/Opportunity.js";
import { errors } from "com";

const { NotFoundError } = errors;

const getArbitrageOpportunitiesController = async (req, res, next) => {
  try {
    const opportunities = await Opportunity.find();
    if (!opportunities) {
      throw new NotFoundError("No opportunities found");
    }
    res.status(200).json(opportunities);
  } catch (error) {
    next(error);
  }
};

export default getArbitrageOpportunitiesController;
