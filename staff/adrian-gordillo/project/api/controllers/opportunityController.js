// api/controllers/opportunityController.js

import Opportunity from "../models/Opportunity.js";

// envolverlo en una lógica separado logico de presentación
export const getOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find();
    res.json(opportunities);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching opportunities: " + error.message });
  }
};
