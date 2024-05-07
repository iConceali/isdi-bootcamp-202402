// api/controllers/tradeController.js

import Trade from "../models/TradeModel.js";

export const getTrades = async (req, res) => {
  try {
    const trades = await Trade.find({ userId: req.user.id });
    res.status(200).json(trades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addTrade = async (req, res) => {
  const { symbol, date, investment, profitPercent } = req.body;

  // Calcular profitDollars en función de profitPercent e investment
  const profitDollars = (investment * profitPercent) / 100;

  const trade = new Trade({
    userId: req.user.id,
    symbol,
    date,
    investment,
    profitPercent,
    profitDollars,
  });

  try {
    const savedTrade = await trade.save();
    res.status(201).json(savedTrade);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
};

export const deleteTrade = async (req, res) => {
  const { id } = req.params; // Obtiene el ID del trade desde los parámetros de la URL

  try {
    const trade = await Trade.findById(id);
    if (!trade) {
      return res.status(404).json({ message: "Trade not found" });
    }

    // Verificar que el trade pertenezca al usuario autenticado
    if (trade.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this trade" });
    }

    // Utiliza findByIdAndDelete para eliminar el trade de la base de datos
    await Trade.findByIdAndDelete(id);
    res.status(200).json({ message: "Trade deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
