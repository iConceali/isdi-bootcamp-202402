// api/models/TechnicalIndicatorOpportunity.js

import mongoose from "mongoose";

const technicalIndicatorOpportunitySchema = new mongoose.Schema(
  {
    symbol: { type: String, required: true },
    strategy: { type: String, required: true },
    message: { type: String, required: true },
    rsi: { type: Number, required: true },
    stochastic: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const TechnicalIndicatorOpportunity = mongoose.model(
  "TechnicalIndicatorOpportunity",
  technicalIndicatorOpportunitySchema
);
export default TechnicalIndicatorOpportunity;
