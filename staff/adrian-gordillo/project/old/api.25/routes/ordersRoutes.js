// api/routes/ordersRoutes.js

import express from "express";
import getOrdersController from "../controllers/orders/getOrdersController";
import createOrderController from "../controllers/orders/createOrderController";
import removeOrderController from "../controllers/orders/removeOrderController";

const router = express.Router();

router.get("/:userId", getOrdersController);
router.post("/:userId", createOrderController);
router.delete("/:userId/order/:orderId", removeOrderController);

export default router;
