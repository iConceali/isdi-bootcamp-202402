// api/routes/userRoutes.js

import { Router } from "express";
import {
  getAllUsers,
  createUser,
  getDeposit,
  updateDeposit,
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from "../controllers/userController.js";
import authenticateUserController from "../controllers/user/authenticateUserController.js";

const router = Router();

router.get("/", getAllUsers);
router.post("/register", createUser);
router.post("/auth", authenticateUserController);
router.get("/deposit", getDeposit);
router.put("/deposit", updateDeposit);
router.post("/:id/watchlist", addToWatchlist);
router.get("/:id/watchlist", getWatchlist);
router.delete("/:id/watchlist/:cryptoId", removeFromWatchlist);

export default router;
