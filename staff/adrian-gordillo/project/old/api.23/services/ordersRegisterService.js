// api/services/ordersRegisterService.js

import Trade from "../models/OrdersRegisterModel.js";
import { validate, errors } from "com";
const { ContentError, NotFoundError, UnauthorizedError } = errors;

export const getOrders = async (userId) => {
  validate.text(userId, "User ID");
  try {
    return await Trade.find({ userId });
  } catch (error) {
    throw new ContentError("Failed to fetch orders");
  }
};

export const createOrder = async (
  userId,
  { symbol, date, investment, profitPercent }
) => {
  validate.text(userId, "User ID");
  validate.text(symbol, "Symbol");
  validate.date(date, "Date");
  validate.number(investment, "Investment");
  validate.number(profitPercent, "Profit Percent");

  const profitDollars = (investment * profitPercent) / 100;

  const trade = new Trade({
    userId,
    symbol,
    date,
    investment,
    profitPercent,
    profitDollars,
  });

  try {
    return await trade.save();
  } catch (error) {
    throw new ContentError("Failed to create order");
  }
};

export const removeOrder = async (orderId, userId) => {
  validate.text(orderId, "Order ID");
  validate.text(userId, "User ID");

  const trade = await Trade.findById(orderId);

  if (!trade) {
    throw new NotFoundError("Trade not found");
  }

  if (trade.userId.toString() !== userId) {
    throw new UnauthorizedError("Not authorized to delete this trade");
  }

  try {
    await Trade.findByIdAndDelete(orderId);
  } catch (error) {
    throw new ContentError("Failed to delete order");
  }
};
