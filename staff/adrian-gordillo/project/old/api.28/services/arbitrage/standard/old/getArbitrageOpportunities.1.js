// api/services/arbitrage/getArbitrageOpportunities.js

import Opportunity from "../../models/Opportunity";
import { errors } from "com";

const { NotFoundError } = errors;

const getArbitrageOpportunities = async () => {
  try {
    const opportunities = await Opportunity.find().lean();
    if (!opportunities) {
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
    console.error("Error fetching arbitrage opportunities:", error);
    throw error;
  }
};

export default getArbitrageOpportunities;
