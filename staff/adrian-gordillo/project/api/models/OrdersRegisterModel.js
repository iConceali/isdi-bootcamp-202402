// api/models/OrdersRegisterModel.js

import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  symbol: { type: String, required: true },
  date: { type: Date, required: true },
  investment: { type: Number, required: true }, // Cambiar el nombre del campo a "investment"
  profitPercent: { type: Number, required: true },
  profitDollars: { type: Number, required: true },
});

const Trade = mongoose.model("Orders", ordersSchema);

export default Trade;
