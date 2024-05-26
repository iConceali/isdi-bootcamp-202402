// api/models/TechnicalOpportunityModel.js

import mongoose from "mongoose";

const technicalOpportunitySchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  strategy: { type: String, required: true },
  message: { type: String, required: true },
  rsi: { type: Number, required: true },
  stochastic: { type: Number, required: true },
});

const TechnicalOpportunity = mongoose.model(
  "TechnicalOpportunity",
  technicalOpportunitySchema
);
export default TechnicalOpportunity;
