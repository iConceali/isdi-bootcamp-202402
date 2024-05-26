// api/services/user/addCryptoToWatchlist.js

import User from "../../models/User.js";
import CryptoPrice from "../../models/CryptoPrice.js";
import { errors, validate } from "com";

const { NotFoundError, DuplicityError } = errors;

const addCryptoToWatchlist = (userId, cryptoId) => {
  validate.text(userId, "userId", true);
  validate.text(cryptoId, "cryptoId", true);

  return (async () => {
    if (!userId || !cryptoId) throw new Error("Required user and crypto IDs");

    const user = await User.findById(userId);
    const crypto = await CryptoPrice.findById(cryptoId);

    if (!user) throw new NotFoundError("User not found");
    if (!crypto) throw new NotFoundError("Crypto not found");
    if (user.watchlist.includes(crypto._id)) {
      throw new DuplicityError("Crypto already in watchlist");
    }

    user.watchlist.push(crypto._id);
    await user.save();
  })();
};

export default addCryptoToWatchlist;
