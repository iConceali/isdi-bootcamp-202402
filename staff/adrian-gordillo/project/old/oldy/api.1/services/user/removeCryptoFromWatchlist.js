// api/services/user/removeCryptoFromWatchlist.js

import User from "../../models/User.js";
import { errors, validate } from "com";

const { NotFoundError } = errors;

const removeCryptoFromWatchlist = (userId, cryptoId) => {
  if (!userId || !cryptoId) throw new Error("Required user and crypto IDs");
  validate.text(userId, "userId", true);
  validate.text(cryptoId, "cryptoId", true);

  return (async () => {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { watchlist: cryptoId } },
      { new: true }
    );

    if (!user) throw new NotFoundError("User not found");
    // return user;
  })();
};

export default removeCryptoFromWatchlist;
