// api/models/OrdersRegisterModel.js

import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  symbol: { type: String, required: true },
  date: { type: Date, required: true },
  investment: { type: Number, required: true },
  profitPercent: { type: Number, required: true },
  profitDollars: { type: Number, required: true },
});

const Order = mongoose.model("Order", ordersSchema);

export default Order;
