// api/services/arbitrage/getArbitrageOpportunities.js

import Opportunity from "../../models/Opportunity.js";
import { errors } from "com";

const { NotFoundError } = errors;

const sanitizeOpportunity = (opportunity) => {
  const { _id, __v, trades, ...rest } = opportunity;

  const sanitizedTrades =
    trades?.map((trade) => {
      const { _id: tradeId, __v: tradeV, ...tradeRest } = trade;
      return {
        id: tradeId ? tradeId.toString() : undefined,
        ...tradeRest,
      };
    }) || [];

  return {
    id: _id.toString(),
    ...rest,
    trades: sanitizedTrades,
  };
};

const getArbitrageOpportunities = async () => {
  try {
    const opportunities = await Opportunity.find().lean();
    if (!opportunities) {
      throw new NotFoundError("No opportunities found");
    }

    // Sanitizar las oportunidades
    const sanitizedOpportunities = opportunities.map(sanitizeOpportunity);

    return sanitizedOpportunities;
  } catch (error) {
    console.error("Error fetching arbitrage opportunities:", error);
    throw error;
  }
};

export default getArbitrageOpportunities;
