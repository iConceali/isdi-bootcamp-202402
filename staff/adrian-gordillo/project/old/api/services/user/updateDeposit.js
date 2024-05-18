// api/services/user/updateDeposit.js

import User from "../../models/User.js";
import { errors, validate } from "com";

const { NotFoundError } = errors;

const updateDeposit = async (userId, deposit) => {
  validate.text(userId, "userId", true);
  validate.number(deposit, "deposit", true);

  if (!userId) throw new Error("No user ID provided");
  if (deposit === undefined) throw new Error("No deposit value provided");

  const user = await User.findById(userId);
  if (!user) throw new NotFoundError("User not found");

  user.deposit = deposit;
  await user.save();

  return { deposit: user.deposit }; // Asegúrate de devolver el depósito actualizado
};

export default updateDeposit;
