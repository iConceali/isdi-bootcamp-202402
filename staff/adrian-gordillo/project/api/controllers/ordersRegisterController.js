// api/controllers/ordersRegisterController.js

import {
  getOrders,
  createOrder,
  removeOrder,
} from "../services/ordersRegisterService.js";

export const getTrades = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await getOrders(userId);
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addTrade = async (req, res) => {
  try {
    const { userId } = req.params;
    const savedOrder = await createOrder(userId, req.body);
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTrade = async (req, res) => {
  try {
    const { userId, orderId } = req.params;
    await removeOrder(orderId, userId);
    res.status(200).json({ message: "Trade deleted successfully" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
