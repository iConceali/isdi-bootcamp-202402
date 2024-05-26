// api/services/user/getUserWatchlist.js.js

import User from "../../models/User.js";
import { errors, validate } from "com";

const { NotFoundError } = errors;

const getUserWatchlist = (userId) => {
  validate.text(userId, "userId", true);

  return (async () => {
    if (!userId) throw new Error("No user ID provided");

    const user = await User.findById(userId).populate("watchlist");
    if (!user) throw new NotFoundError("User not found");

    return user.watchlist.map((crypto) => crypto._id);
  })();
};

export default getUserWatchlist;
