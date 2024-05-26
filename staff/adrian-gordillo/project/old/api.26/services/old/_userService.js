// api/services/userService.js

import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CryptoPrice from "../models/CryptoPrice.js";
import { errors } from "com";

const { CredentialsError, NotFoundError, DuplicityError } = errors;

export const createUser = async ({ name, email, password }) => {
  email = email.trim(); // Asegúrate de que no hay espacios en blanco extra
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new DuplicityError("User with this email already exists");
  }

  const user = new User({
    name,
    email,
    password,
  });
  await user.save();
  return user;
};

export const getAllUsers = async () => {
  const users = await User.find();
  if (!users.length) {
    throw new NotFoundError("No users found");
  }
  return users;
};

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password must be provided");
  }
  email = email.trim(); // Asegurándose de que email no es undefined
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError("User not found");
  }
  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    throw new CredentialsError("Invalid password");
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return { token, user: { _id: user._id } };
};

export const getDeposit = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  return user.deposit;
};

export const updateDeposit = async (userId, deposit) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  user.deposit = deposit;
  await user.save();
};

export const addToWatchlist = async (userId, cryptoId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  const crypto = await CryptoPrice.findById(cryptoId);
  if (!crypto) {
    throw new NotFoundError("Crypto not found");
  }
  if (user.watchlist.includes(crypto._id)) {
    throw new DuplicityError("Crypto already in watchlist");
  }
  user.watchlist.push(crypto._id);
  await user.save();
};

export const getWatchlist = async (userId) => {
  const user = await User.findById(userId).populate("watchlist");
  if (!user) {
    throw new NotFoundError("User not found");
  }
  return user.watchlist.map((crypto) => crypto._id);
};

export const removeFromWatchlist = async (userId, cryptoId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $pull: { watchlist: cryptoId } },
    { new: true }
  );
  if (!user) {
    throw new NotFoundError("User not found");
  }
};
