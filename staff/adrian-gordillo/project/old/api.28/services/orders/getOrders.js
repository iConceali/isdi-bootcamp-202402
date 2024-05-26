// api/services/orders/getOrders.js

import Order from "../../models/OrdersRegister.js";
import { validate, errors } from "com";

const { ContentError } = errors;

/**
 * Servicio para obtener las órdenes de un usuario
 */
const getOrders = (userId) => {
  validate.text(userId, "User ID");
  return (async () => {
    try {
      const orders = await Order.find({ userId }).lean();
      return orders.map((order) => {
        const { _id, __v, ...rest } = order;
        return {
          id: _id.toString(),
          ...rest,
        };
      });
    } catch (error) {
      throw new ContentError("Failed to fetch orders");
    }
  })();
};

export default getOrders;
