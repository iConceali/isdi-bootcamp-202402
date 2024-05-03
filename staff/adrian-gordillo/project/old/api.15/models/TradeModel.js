// api/models/TradeModel.js

import mongoose from "mongoose";

const tradeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  symbol: { type: String, required: true },
  date: { type: Date, required: true },
  buyPrice: { type: Number, required: true },
  sellPrice: { type: Number, required: true },
  profitPercent: { type: Number, required: true },
  profitDollars: { type: Number, required: true },
});

const Trade = mongoose.model("Trade", tradeSchema);

export default Trade;
