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
  }
};
