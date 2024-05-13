// api/controllers/ordersRegisterController.js

import {
  getOrders,
  createOrder,
  removeOrder,
} from "../services/ordersRegisterService.js";

export const getTrades = async (req, res) => {
  try {
    const orders = await getOrders(req.user.id);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addTrade = async (req, res) => {
  try {
    const savedOrder = await createOrder(req.user.id, req.body);
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTrade = async (req, res) => {
  try {
    await removeOrder(req.params.id, req.user.id);
    res.status(200).json({ message: "Trade deleted successfully" });
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};
