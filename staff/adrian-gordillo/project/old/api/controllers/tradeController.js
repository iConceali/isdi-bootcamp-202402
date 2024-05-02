//api/controllers/tradeController.js

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
  const { symbol, date, buyPrice, sellPrice } = req.body;
  const profitDollars = (sellPrice - buyPrice).toFixed(2);
  const profitPercent = ((profitDollars / buyPrice) * 100).toFixed(2);

  const trade = new Trade({
    userId: req.user.id,
    symbol,
    date,
    buyPrice,
    sellPrice,
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
