const axios = require("axios");
const sendNotificationEmail = require("./mailer");

// Definición de los exchanges con sus URLs y métodos de formato
const exchanges = [
  {
    name: "Binance",
    url: "https://api.binance.com/api/v3/ticker/price?symbol=",
    symbols: [
      "BTCUSDT",
      "ETHUSDT",
      "LTCUSDT",
      "ADAUSDT",
      "SOLUSDT",
      "DOTUSDT",
      "MATICUSDT",
    ],
    format: (data) => ({ price: parseFloat(data.price) }),
  },
  {
    name: "Kraken",
    url: "https://api.kraken.com/0/public/Ticker?pair=",
    symbols: [
      "XXBTZUSD",
      "XETHZUSD",
      "XLTCZUSD",
      "ADAUSD",
      "SOLUSD",
      "DOTUSD",
      "MATICUSD",
    ],
    format: (data) => {
      const key = Object.keys(data.result)[0];
      return { price: parseFloat(data.result[key].c[0]) };
    },
  },
  {
    name: "Coinbase",
    url: "https://api.coinbase.com/v2/prices/",
    symbols: [
      "BTC-USD",
      "ETH-USD",
      "LTC-USD",
      "ADA-USD",
      "SOL-USD",
      "DOT-USD",
      "MATIC-USD",
    ],
    format: (data) => ({ price: parseFloat(data.data.amount) }),
  },
  {
    name: "Bitfinex",
    url: "https://api-pub.bitfinex.com/v2/ticker/",
    symbols: ["tBTCUSD", "tETHUSD", "tLTCUSD", "tADAUSD", "tSOLUSD", "tDOTUSD"],
    format: (data) => ({ price: parseFloat(data[6]) }),
  },
  {
    name: "Crypto.com",
    url: "https://api.crypto.com/v2/public/get-ticker?instrument_name=",
    symbols: [
      "BTC_USDT",
      "ETH_USDT",
      "LTC_USDT",
      "ADA_USDT",
      "SOL_USDT",
      "DOT_USDT",
      "MATIC_USDT",
    ],
    format: (data) => ({ price: parseFloat(data.result.data[0].a) }),
  },
  {
    name: "Gate.io",
    url: "https://api.gateio.ws/api/v4/spot/tickers?currency_pair=",
    symbols: [
      "BTC_USDT",
      "ETH_USDT",
      "LTC_USDT",
      "ADA_USDT",
      "SOL_USDT",
      "DOT_USDT",
      "MATIC_USDT",
    ],
    format: (data) => ({ price: parseFloat(data[0].last) }),
  },
  {
    name: "KuCoin",
    url: "https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=",
    symbols: [
      "BTC-USDT",
      "ETH-USDT",
      "LTC-USDT",
      "ADA-USDT",
      "SOL-USDT",
      "DOT-USDT",
      "MATIC-USDT",
    ],
    format: (data) => ({ price: parseFloat(data.data.price) }),
  },
];

async function fetchPrice(exchange, symbol) {
  const url = exchange.url + symbol;
  try {
    const response = await axios.get(url);
    return {
      exchange: exchange.name,
      symbol: symbol,
      price: exchange.format(response.data).price,
    };
  } catch (error) {
    console.error(`Error fetching price from ${exchange.name}:`, error);
    return null;
  }
}

exports.detectArbitrageOpportunities = async (config) => {
  const prices = await Promise.all(
    exchanges.flatMap((exchange) =>
      exchange.symbols.map((symbol) => fetchPrice(exchange, symbol))
    )
  );

  const validPrices = prices.filter((p) => p);
  const sortedPrices = validPrices.sort((a, b) => a.price - b.price);
  let opportunities = [];

  for (let i = 0; i < sortedPrices.length - 1; i++) {
    for (let j = i + 1; j < sortedPrices.length; j++) {
      const potentialProfit = sortedPrices[j].price - sortedPrices[i].price;
      if (potentialProfit >= config.umbralRentabilidad) {
        opportunities.push({
          buyExchange: sortedPrices[i].exchange,
          buyPrice: sortedPrices[i].price,
          sellExchange: sortedPrices[j].exchange,
          sellPrice: sortedPrices[j].price,
          profit: potentialProfit,
        });
      }
    }
  }

  return opportunities;
};
