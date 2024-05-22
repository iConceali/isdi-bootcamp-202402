// api/services/orders/removeOrder.js

import Trade from "../../models/OrdersRegister.js";
import { validate, errors } from "com";

const { ContentError, NotFoundError, UnauthorizedError } = errors;

/**
 * Servicio para eliminar una orden
 */
const removeOrder = async (orderId, userId) => {
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

export default removeOrder;
