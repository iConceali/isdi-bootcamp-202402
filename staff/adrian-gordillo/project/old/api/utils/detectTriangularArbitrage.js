// api/utils/detectTriangularArbitrage.js

import { detectTriangularArbitrage } from "./arbitrageDetector2.js";
import Opportunity from "../models/Opportunity.js";

export async function runTriangularDetection() {
  try {
    await Opportunity.deleteMany({ type: "triangular" });
    console.log("Cleared old triangular arbitrage opportunities.");

    const opportunities = await detectTriangularArbitrage();
    if (opportunities.length > 0 && opportunities[0].success) {
      await Opportunity.insertMany(
        opportunities.map((op) => ({ ...op, type: "triangular" }))
      );
      console.log("Triangular arbitrage opportunities detected and stored.");
    } else {
      console.log("No triangular arbitrage opportunities found.");
    }
  } catch (error) {
    console.error("Error in detecting triangular arbitrage: ", error);
  }
}
