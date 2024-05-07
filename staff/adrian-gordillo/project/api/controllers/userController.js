// api/controllers/userController.js

import {
  getAllUsersService,
  createUserService,
  loginUserService,
  getUserDepositService,
  updateUserDepositService,
  addUserToWatchlistService,
  getUserWatchlistService,
  removeUserFromWatchlistService,
} from "../logic/userService.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users: " + error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = await createUserService({
      name: req.body.name, // Asegúrate de que estos campos coincidan con los del frontend
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json(newUser);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({ message: messages.join(", ") });
    } else if (error.code === 11000) {
      res.status(400).json({ message: "Email already in use" });
    } else {
      res.status(500).json({ message: "Server error: " + error.message });
    }
  }
};

export const loginUser = async (req, res) => {
  try {
    const { token, user } = await loginUserService(req.body);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getDeposit = async (req, res) => {
  try {
    const deposit = await getUserDepositService(req.user.id);
    res.status(200).json({ deposit });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDeposit = async (req, res) => {
  try {
    await updateUserDepositService(req.user.id, req.body.deposit);
    res.status(200).json({ message: "Deposit updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToWatchlist = async (req, res) => {
  try {
    await addUserToWatchlistService(req.params.id, req.body.cryptoId);
    res.status(200).json({ message: "Crypto added to watchlist" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getWatchlist = async (req, res) => {
  try {
    const watchlist = await getUserWatchlistService(req.params.id);
    res.status(200).json(watchlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromWatchlist = async (req, res) => {
  try {
    await removeUserFromWatchlistService(req.params.id, req.params.cryptoId);
    res.status(200).json({ message: "Crypto removed from watchlist" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
