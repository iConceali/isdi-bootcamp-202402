// api/routes/tradeRoutes.js

import express from "express";
import { getTrades, addTrade } from "../controllers/tradeController.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticate, getTrades);
router.post("/", authenticate, addTrade);

export default router;
