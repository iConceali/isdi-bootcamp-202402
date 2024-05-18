//api/services/arbitrageStandardService.js

import { detectArbitrage } from "../services/arbitrageTriangularDetector.js";
import Opportunity from "../models/Opportunity.js";

export async function runTriangularDetection() {
  await Opportunity.deleteMany({ type: "triangular" });
  console.log("Cleared old triangular arbitrage opportunities.");
  const opportunities = await detectArbitrage();
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
