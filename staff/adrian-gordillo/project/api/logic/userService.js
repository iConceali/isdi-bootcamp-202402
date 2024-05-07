// api/logic/userService.js

import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CryptoPrice from "../models/CryptoPriceModel.js";

export const getAllUsersService = async () => {
  return await User.find();
};

export const createUserService = async ({
  nombre,
  correoElectronico,
  contraseña,
}) => {
  //   const salt = await bcrypt.genSalt(10);
  //   const hashedPassword = await bcrypt.hash(contraseña, salt);
  const user = new User({
    nombre,
    correoElectronico,
    contraseña,
    // contraseña: hashedPassword,
  });
  return await user.save();
};

export const loginUserService = async ({ correoElectronico, contraseña }) => {
  const user = await User.findOne({ correoElectronico });
  if (!user || !(await bcrypt.compare(contraseña, user.contraseña))) {
    throw new Error("Invalid email or password");
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return { token, user: { nombre: user.nombre, _id: user._id } };
};

export const getUserDepositService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  return user.deposit;
};

export const updateUserDepositService = async (userId, deposit) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  user.deposit = deposit;
  await user.save();
};

export const addUserToWatchlistService = async (userId, cryptoId) => {
  const user = await User.findById(userId);
  const crypto = await CryptoPrice.findById(cryptoId);
  if (!user || !crypto) throw new Error("User or Crypto not found");
  if (user.watchlist.includes(crypto._id))
    throw new Error("Crypto already in watchlist");
  user.watchlist.push(crypto._id);
  await user.save();
};

export const getUserWatchlistService = async (userId) => {
  const user = await User.findById(userId).populate("watchlist");
  if (!user) throw new Error("User not found");
  return user.watchlist.map((crypto) => crypto._id);
};

export const removeUserFromWatchlistService = async (userId, cryptoId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $pull: { watchlist: cryptoId } },
    { new: true }
  );
  if (!user) throw new Error("User not found");
};
