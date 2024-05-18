// api/routes/tradeRoutes.js

import express from "express";
import {
  getTrades,
  addTrade,
  deleteTrade,
} from "../controllers/ordersRegisterController.js";

const router = express.Router();

router.get("/:userId", getTrades);
router.post("/:userId", addTrade);
router.delete("/:userId/order/:orderId", deleteTrade);

export default router;
