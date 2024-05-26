// api/services/orders/getOrders.js

import Trade from "../../models/OrdersRegister.js";
import { validate, errors } from "com";

const { ContentError } = errors;

/**
 * Servicio para obtener las órdenes de un usuario
 */
const getOrders = (userId) => {
  validate.text(userId, "User ID");
  return (async () => {
    try {
      return await Trade.find({ userId });
    } catch (error) {
      throw new ContentError("Failed to fetch orders");
    }
  })();
};

export default getOrders;
