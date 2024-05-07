//api/logic/arbitrageStandardService.js

import { detectTriangularArbitrage } from "../logic/arbitrageTriangularDetector.js";
import Opportunity from "../models/StandardAndTriangularOpportunityModel.js";

export async function runTriangularDetection() {
  await Opportunity.deleteMany({ type: "triangular" });
  console.log("Cleared old triangular arbitrage opportunities.");
  const opportunities = await detectTriangularArbitrage();
  if (opportunities.length > 0) {
    await Opportunity.insertMany(
      opportunities.map((op) => ({ ...op, type: "triangular" }))
    );
    console.log("Triangular arbitrage opportunities detected and stored.");
  } else {
    console.log("No triangular arbitrage opportunities found.");
  }
  return opportunities;
}
