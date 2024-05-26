// api/services/user/getDeposit.js

import User from "../../models/User";
import { errors, validate } from "com";

const { NotFoundError } = errors;

const getDeposit = async (userId) => {
  validate.text(userId, "userId", true);

  return (async () => {
    if (!userId) throw new Error("No user ID provided");

    const user = await User.findById(userId);
    if (!user) throw new NotFoundError("User not found");

    return user.deposit;
  })();
};

export default getDeposit;
