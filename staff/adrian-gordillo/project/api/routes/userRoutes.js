// api/routes/userRoutes.js

import { Router } from "express";
import authenticate from "../middleware/auth.js";
import {
  getAllUsers,
  createUser,
  loginUser,
  getDeposit,
  updateDeposit,
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from "../controllers/userController.js";

const router = Router();

router.get("/", authenticate, getAllUsers);
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/deposit", authenticate, getDeposit);
router.put("/deposit", authenticate, updateDeposit);
router.post("/:id/watchlist", authenticate, addToWatchlist);
router.get("/:id/watchlist", authenticate, getWatchlist);
router.delete("/:id/watchlist/:cryptoId", authenticate, removeFromWatchlist);

export default router;
