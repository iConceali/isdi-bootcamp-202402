// api/services/user/index.js

import authenticateUserController from "./authenticateUserController.js";
import createUserController from "./createUserController.js";
import getDepositController from "./getDepositController.js";
import updateDepositController from "./updateDepositController.js";
import addCryptoToWatchlistController from "./addCryptoToWatchlistController.js";
import getUserWatchlistController from "./getUserWatchlistController.js";
import removeCryptoFromWatchlistController from "./removeCryptoFromWatchlistController.js";

const user = {
  authenticateUserController,
  createUserController,
  getDepositController,
  updateDepositController,
  addCryptoToWatchlistController,
  getUserWatchlistController,
  removeCryptoFromWatchlistController,
};

export default user;
