// api/utils/arbritageDetector.js

const axios = require("axios");
const sendNotificationEmail = require("./mailer");

const exchanges = [
  {
    name: "Binance",
    url: "https://api.binance.com/api/v3/ticker/price?symbol=",
    symbol: "BTCUSDT",
  },
  {
    name: "Kraken",
    url: "https://api.kraken.com/0/public/Ticker?pair=",
    symbol: "XBTUSD",
  },
];

async function fetchPrice(exchange) {
  try {
    const response = await axios.get(exchange.url + exchange.symbol);
    return {
      exchange: exchange.name,
      price: parseFloat(
        response.data.price || response.data.result[exchange.symbol].c[0]
      ), // Adapt based on API response structure
      symbol: exchange.symbol,
    };
  } catch (error) {
    console.error(`Error fetching price from ${exchange.name}:`, error);
    return null;
  }
}

exports.detectArbitrageOpportunities = async () => {
  try {
    const prices = await Promise.all(exchanges.map(fetchPrice));
    const sortedPrices = prices
      .filter((p) => p)
      .sort((a, b) => a.price - b.price);
    const opportunity =
      sortedPrices.length > 1 &&
      sortedPrices[sortedPrices.length - 1].price - sortedPrices[0].price > 50; // Threshold of $50

    if (opportunity) {
      const message = `Arbitrage Opportunity: Buy at ${
        sortedPrices[0].exchange
      } for ${sortedPrices[0].price} and sell at ${
        sortedPrices[sortedPrices.length - 1].exchange
      } for ${sortedPrices[sortedPrices.length - 1].price}.`;
      const userEmail = "user@example.com"; // This should be dynamically fetched or passed as an argument
      sendNotificationEmail(userEmail, message);
    }
  } catch (error) {
    console.error("Error detecting arbitrage opportunities:", error);
  }
};
