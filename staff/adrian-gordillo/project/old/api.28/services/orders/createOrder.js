import Order from "../../models/OrdersRegister.js";
import { validate, errors } from "com";

const { ContentError } = errors;

/**
 * Servicio para crear una nueva orden
 */
const createOrder = (userId, { symbol, date, investment, profitPercent }) => {
  validate.text(userId, "User ID");
  validate.text(symbol, "Symbol");
  validate.date(date, "Date");
  validate.number(investment, "Investment");
  validate.number(profitPercent, "Profit Percent");

  return (async () => {
    const profitDollars = (investment * profitPercent) / 100;

    const order = new Order({
      userId,
      symbol,
      date,
      investment,
      profitPercent,
      profitDollars,
    });

    try {
      const newOrder = await order.save();
      return newOrder; // No es necesario sanitizar aquí
    } catch (error) {
      throw new ContentError("Failed to create order");
    }
  })();
};

export default createOrder;
