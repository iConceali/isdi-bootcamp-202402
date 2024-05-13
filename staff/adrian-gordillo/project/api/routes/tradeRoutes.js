// api/routes/tradeRoutes.js

import express from "express";
import {
  getTrades,
  addTrade,
  deleteTrade,
} from "../controllers/ordersRegisterController.js";

const router = express.Router();

router.get("/", getTrades);
router.post("/", addTrade);
router.delete("/:id", deleteTrade);

export default router;
