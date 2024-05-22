// api/controllers/orders/createOrderController.js

import createOrder from "../../services/orders/createOrder.js";
import { errors } from "com";

const { SystemError, ContentError } = errors;

/**
 * Controlador para crear una nueva orden
 */
const createOrderController = async (req, res, next) => {
  const { userId } = req.params;
  const orderData = req.body;
  try {
    const newOrder = await createOrder(userId, orderData);
    res.status(201).json({ order: newOrder });
  } catch (error) {
    if (error instanceof ContentError) {
      res.status(400).json({ error: error.message });
    } else {
      next(error);
    }
  }
};

export default createOrderController;
