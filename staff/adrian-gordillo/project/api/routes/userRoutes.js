// api/routes/userRoutes.js

import { Router } from "express";

import user from "../controllers/user/index.js";

const {
  authenticateUserController,
  createUserController,
  getDepositController,
  updateDepositController,
  addCryptoToWatchlistController,
  getUserWatchlistController,
  removeCryptoFromWatchlistController,
} = user;

const router = Router();

// router.get("/", getAllUsers);
router.post("/register", createUserController);
router.post("/auth", authenticateUserController);
router.get("/:userId/deposit", getDepositController);
router.put("/:userId/deposit", updateDepositController);
router.post("/:userId/watchlist/:cryptoId", addCryptoToWatchlistController);
router.get("/:userId/watchlist", getUserWatchlistController);
router.delete(
  "/:userId/watchlist/:cryptoId",
  removeCryptoFromWatchlistController
);

export default router;
