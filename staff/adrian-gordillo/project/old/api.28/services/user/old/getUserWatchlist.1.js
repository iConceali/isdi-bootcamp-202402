// api/services/user/getUserWatchlist.js.js

import User from "../../models/User.js";
import { errors, validate } from "com";

const { NotFoundError } = errors;

const getUserWatchlist = (userId) => {
  validate.text(userId, "userId", true);

  return (async () => {
    if (!userId) throw new Error("No user ID provided");

    const user = await User.findById(userId).populate("watchlist").lean();
    if (!user) throw new NotFoundError("User not found");

    user.watchlist.forEach((crypto) => {
      crypto.id = crypto._id.toString();
      delete crypto._id;

      // if (user.watchlist._id) {
      //   user.watchlist.id = user.watchlist._id.toString();

      //   delete user.watchlist._id;
      // }
    });
    return user.watchlist.map((crypto) => crypto.id);

    // return user.watchlist.map((crypto) => crypto._id);
  })();
};

export default getUserWatchlist;
