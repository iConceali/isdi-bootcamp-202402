// api/services/orders/createOrder.js

import Trade from "../../models/OrdersRegisterModel.js";
import { validate, errors } from "com";

const { ContentError } = errors;

/**
 * Servicio para crear una nueva orden
 */
const createOrder = async (
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
    const newTrade = await trade.save();
    return newTrade;
  } catch (error) {
    throw new ContentError("Failed to create order");
  }
};

export default createOrder;
