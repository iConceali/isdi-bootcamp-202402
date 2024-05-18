// api/controllers/orders/getOrdersController.js

import getOrders from "../../services/orders/getOrders.js";
import { errors } from "com";

const { SystemError, ContentError } = errors;

/**
 * Controlador para obtener las órdenes de un usuario
 */
const getOrdersController = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const orders = await getOrders(userId);
    res.status(200).json(orders);
  } catch (error) {
    if (error instanceof ContentError) {
      res.status(400).json({ error: error.message });
    } else {
      next(error);
    }
  }
};

export default getOrdersController;
