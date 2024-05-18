// api/services/userService.js
import CryptoPrice from "../models/CryptoPrice.js";
import { errors } from "com";
import User from "../models/User.js";

const { NotFoundError, DuplicityError } = errors;

export const createUserService = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new DuplicityError("User with this email already exists");
  }

  const user = new User({
    name,
    email,
    password,
  });
  return await user.save();
};

export const getAllUsersService = async () => {
  return await User.find();
};

export const getUserDepositService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new NotFoundError("User not found");
  return user.deposit;
};

export const updateUserDepositService = async (userId, deposit) => {
  const user = await User.findById(userId);
  if (!user) throw new NotFoundError("User not found");
  user.deposit = deposit;
  await user.save();
};

export const addUserToWatchlistService = async (userId, cryptoId) => {
  const user = await User.findById(userId);
  const crypto = await CryptoPrice.findById(cryptoId);
  if (!user) throw new NotFoundError("User not found");
  if (!crypto) throw new NotFoundError("Crypto not found");
  if (user.watchlist.includes(crypto._id))
    throw new DuplicityError("Crypto already in watchlist");
  user.watchlist.push(crypto._id);
  await user.save();
};

export const getUserWatchlistService = async (userId) => {
  const user = await User.findById(userId).populate("watchlist");
  if (!user) throw new NotFoundError("User not found");
  return user.watchlist.map((crypto) => crypto._id);
};

export const removeUserFromWatchlistService = async (userId, cryptoId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $pull: { watchlist: cryptoId } },
    { new: true }
  );
  if (!user) throw new NotFoundError("User not found");
};
