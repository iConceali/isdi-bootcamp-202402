import axios from "axios";

const getSymbolBookTicker = async (symbol) => {
  try {
    const response = await axios.get(
      `https://api.binance.com/api/v3/ticker/bookTicker?symbol=${symbol}`
    );
    return {
      symbol,
      bidPrice: parseFloat(response.data.bidPrice),
      askPrice: parseFloat(response.data.askPrice),
      exchange: "Binance",
    };
  } catch (error) {
    console.error(`Error al obtener el book ticker para ${symbol}: ${error}`);
    throw error; // Propagating the error upwards
  }
};

export const detectTriangularArbitrage = async () => {
  const triangles = [
    ["BTCUSDT", "ETHBTC", "ETHUSDT"],
    ["BTCUSDT", "BNBBTC", "BNBUSDT"],
    ["ETHUSDT", "BNBETH", "BNBUSDT"],
    ["BTCUSDT", "ADABTC", "ADAUSDT"],
    ["BTCUSDT", "XRPBTC", "XRPUSDT"],
    ["BTCUSDT", "LTCBTC", "LTCUSDT"],
    ["ETHBTC", "XRPETH", "XRPBTC"],
    ["BTCUSDT", "DOTBTC", "DOTUSDT"],
    ["ETHUSDT", "LINKETH", "LINKUSDT"],
    ["BTCUSDT", "DOGEUSDT", "DOGEBTC"],
    ["ETHUSDT", "AAVEETH", "AAVEUSDT"],
    ["BTCUSDT", "UNIBTC", "UNIUSDT"],
    ["ETHBTC", "LTCETH", "LTCBTC"],
    ["BTCUSDT", "VETBTC", "VETUSDT"],
    ["ETHBTC", "MANAETH", "MANABTC"],
    ["BTCUSDT", "FILBTC", "FILUSDT"],
    ["ETHBTC", "ATOMETH", "ATOMBTC"],
    ["BTCUSDT", "CAKEBTC", "CAKEUSDT"],
    ["ETHBTC", "XLMETH", "XLMBTC"],
    ["BTCUSDT", "MATICBTC", "MATICUSDT"],
  ];
  const allArbitrageOpportunities = [];
  for (const triangle of triangles) {
    const tickers = await Promise.all(triangle.map(getSymbolBookTicker));
    let startingAmount = 1000;
    let currentAmount = startingAmount;
    let trades = [];
    tickers.forEach((ticker, i) => {
      const parts = /^(\w+)(USD|USDT|ETH|BTC)$/.exec(triangle[i]);
      if (!parts) return; // Skip if symbol parsing fails
      const tradeAmount =
        i === tickers.length - 1
          ? currentAmount * ticker.bidPrice
          : currentAmount / ticker.askPrice;
      trades.push({ from: parts[1], to: parts[2], amount: tradeAmount });
      currentAmount = tradeAmount;
    });
    const profit = currentAmount - startingAmount;
    if (profit > 0.02) {
      allArbitrageOpportunities.push({
        success: true,
        profit,
        trades,
        exchange: "Binance",
      });
    }
  }
  return allArbitrageOpportunities.length
    ? allArbitrageOpportunities
    : [{ success: false, message: "No opportunities found." }];
};
