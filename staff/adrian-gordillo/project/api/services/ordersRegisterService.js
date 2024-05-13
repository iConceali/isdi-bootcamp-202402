// api/services/ordersRegisterService.js

import Trade from "../models/OrdersRegisterModel.js";

export const getOrders = async (userId) => {
  return await Trade.find({ userId });
};

export const createOrder = async (
  userId,
  { symbol, date, investment, profitPercent }
) => {
  const profitDollars = (investment * profitPercent) / 100;

  const trade = new Trade({
    userId,
    symbol,
    date,
    investment,
    profitPercent,
    profitDollars,
  });

  return await trade.save();
};

export const removeOrder = async (tradeId, userId) => {
  const trade = await Trade.findById(tradeId);

  if (!trade) {
    throw { status: 404, message: "Trade not found" };
  }

  if (trade.userId.toString() !== userId) {
    throw { status: 403, message: "Not authorized to delete this trade" };
  }

  await Trade.findByIdAndDelete(tradeId);
};
