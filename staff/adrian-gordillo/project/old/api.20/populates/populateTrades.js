// populateTrades.js

import mongoose from "mongoose";
import Trade from "../models/TradeModel.js";

// Configuración de Mongoose
mongoose
  .connect("mongodb://localhost:27017/tradingdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const userId = "6633b92d736966aee824c0aa"; // Asegúrate de cambiar esto por un ID de usuario válido de tu base de datos
const symbols = ["BTC/USDT", "ETH/USDT", "DOT/USDT", "LTC/USDT"];
const trades = [];

for (let i = 0; i < 15; i++) {
  const investment = Math.floor(Math.random() * 1000) + 100;
  const profitPercent = (Math.random() * 20 - 10).toFixed(2);
  const profitDollars = ((investment * profitPercent) / 100).toFixed(2);

  trades.push({
    userId: new mongoose.Types.ObjectId(userId),
    symbol: symbols[Math.floor(Math.random() * symbols.length)],
    date: new Date(),
    investment: investment,
    profitPercent: profitPercent,
    profitDollars: profitDollars,
  });
}

Trade.insertMany(trades)
  .then(() => {
    console.log("Trades populated");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error populating trades:", err);
    mongoose.connection.close();
  });
