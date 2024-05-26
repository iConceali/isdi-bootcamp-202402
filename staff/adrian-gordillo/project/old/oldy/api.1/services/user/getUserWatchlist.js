// api/services/user/getUserWatchlist.js.js

import User from "../../models/User.js";
import { errors, validate } from "com";

const { NotFoundError } = errors;

const getUserWatchlist = async (userId) => {
  validate.text(userId, "userId", true);

  if (!userId) throw new Error("No user ID provided");

  const user = await User.findById(userId).populate("watchlist").lean();
  if (!user) throw new NotFoundError("User not found");

  const sanitizedWatchlist = user.watchlist.map((crypto) => {
    const { _id, __v, ...rest } = crypto;
    return {
      id: _id.toString(),
      ...rest,
    };
  });

  return sanitizedWatchlist; // Devuelve directamente la watchlist
};

export default getUserWatchlist;

// import User from "../../models/User.js";
// import { errors, validate } from "com";

// const { NotFoundError } = errors;

// const getUserWatchlist = async (userId) => {
//   validate.text(userId, "userId", true);

//   if (!userId) throw new Error("No user ID provided");

//   const user = await User.findById(userId).populate("watchlist").lean();
//   if (!user) throw new NotFoundError("User not found");

//   const watchlist = user.watchlist.map((crypto) => {
//     const { _id, __v, ...rest } = crypto;
//     return {
//       id: _id.toString(),
//       ...rest,
//     };
//   });

//   return { watchlist };
// };

// export default getUserWatchlist;
