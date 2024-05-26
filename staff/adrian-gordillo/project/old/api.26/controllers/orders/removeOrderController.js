// api/controllers/orders/removeOrderController.js

import removeOrder from "../../services/orders/removeOrder.js";
import { errors } from "com";

const { SystemError, ContentError, NotFoundError, UnauthorizedError } = errors;

/**
 * Controlador para eliminar una orden
 */
const removeOrderController = async (req, res, next) => {
  const { orderId, userId } = req.params;
  try {
    await removeOrder(orderId, userId);
    res.status(204).end();
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof UnauthorizedError) {
      res.status(404).json({ error: error.message });
    } else if (error instanceof ContentError) {
      res.status(400).json({ error: error.message });
    } else {
      next(error);
    }
  }
};

export default removeOrderController;
