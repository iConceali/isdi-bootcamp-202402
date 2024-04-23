// api/utils/arbitrageDetector.js

import axios from "axios";
// import sendNotificationEmail from "./mailer.js";

const exchanges = [
  {
    name: "Binance",
    url: "https://api.binance.com/api/v3/ticker/bookTicker?symbol=",
    format: (data) => ({
      bid: parseFloat(data.bidPrice),
      ask: parseFloat(data.askPrice),
    }),
  },
  {
    name: "Kraken",
    url: "https://api.kraken.com/0/public/Ticker?pair=",
    format: (data, symbol) => {
      const key = Object.keys(data.result)[0];
      return {
        bid: parseFloat(data.result[key].b[0]),
        ask: parseFloat(data.result[key].a[0]),
      };
    },
  },
  {
    name: "Coinbase",
    url: "https://api.pro.coinbase.com/products/",
    endpointSuffix: "/ticker",
    format: (data) => ({
      bid: parseFloat(data.bid),
      ask: parseFloat(data.ask),
    }),
  },
  {
    name: "Bitfinex",
    url: "https://api-pub.bitfinex.com/v2/ticker/",
    format: (data) => ({
      bid: parseFloat(data[0]),
      ask: parseFloat(data[2]),
    }),
  },
  {
    name: "Crypto.com",
    url: "https://api.crypto.com/v2/public/get-ticker?instrument_name=",
    format: (data) => ({
      bid: parseFloat(data.result.data[0].b),
      ask: parseFloat(data.result.data[0].k),
    }),
  },
  {
    name: "Gate.io",
    url: "https://api.gateio.ws/api/v4/spot/tickers?currency_pair=",
    format: (data) => ({
      bid: parseFloat(data[0].highest_bid),
      ask: parseFloat(data[0].lowest_ask),
    }),
  },
  {
    name: "KuCoin",
    url: "https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=",
    format: (data) => ({
      bid: parseFloat(data.data.bestBid),
      ask: parseFloat(data.data.bestAsk),
    }),
  },
];

const symbolMappings = {
  "BTC/USDT": {
    Binance: "BTCUSDT",
    Kraken: "XXBTZUSD",
    Coinbase: "BTC-USD",
    Bitfinex: "tBTCUSD",
    "Crypto.com": "BTC_USDT",
    "Gate.io": "BTC_USDT",
    KuCoin: "BTC-USDT",
  },
  "ETH/USDT": {
    Binance: "ETHUSDT",
    Kraken: "XETHZUSD",
    Coinbase: "ETH-USD",
    Bitfinex: "tETHUSD",
    "Crypto.com": "ETH_USDT",
    "Gate.io": "ETH_USDT",
    KuCoin: "ETH-USDT",
  },
  "LTC/USDT": {
    Binance: "LTCUSDT",
    Kraken: "XLTCZUSD",
    Coinbase: "LTC-USD",
    Bitfinex: "tLTCUSD",
    "Crypto.com": "LTC_USDT",
    "Gate.io": "LTC_USDT",
    KuCoin: "LTC-USDT",
  },
  "ADA/USDT": {
    Binance: "ADAUSDT",
    Kraken: "ADAUSD",
    Coinbase: "ADA-USD",
    Bitfinex: "tADAUSD",
    "Crypto.com": "ADA_USDT",
    "Gate.io": "ADA_USDT",
    KuCoin: "ADA-USDT",
  },
  "SOL/USDT": {
    Binance: "SOLUSDT",
    Kraken: "SOLUSD",
    Coinbase: "SOL-USD",
    Bitfinex: "tSOLUSD",
    "Crypto.com": "SOL_USDT",
    "Gate.io": "SOL_USDT",
    KuCoin: "SOL-USDT",
  },
  "DOT/USDT": {
    Binance: "DOTUSDT",
    Kraken: "DOTUSD",
    Coinbase: "DOT-USD",
    Bitfinex: "tDOTUSD",
    "Crypto.com": "DOT_USDT",
    "Gate.io": "DOT_USDT",
    KuCoin: "DOT-USDT",
  },
  "MATIC/USDT": {
    Binance: "MATICUSDT",
    Kraken: "MATICUSD",
    Coinbase: "MATIC-USD",
    "Crypto.com": "MATIC_USDT",
    "Gate.io": "MATIC_USDT",
    KuCoin: "MATIC-USDT",
  },
  // Add more mappings for other cryptocurrency pairs
};

async function fetchPrice(exchange, standardSymbol, commissionRates) {
  const symbol = symbolMappings[standardSymbol][exchange.name];
  if (!symbol) {
    console.error(
      `No symbol mapping found for ${standardSymbol} on ${exchange.name}.`
    );
    return null;
  }

  const commission = commissionRates[exchange.name] || 0; // Default to 0 if not defined
  const url = `${exchange.url}${symbol}${exchange.endpointSuffix || ""}`;
  try {
    const response = await axios.get(url);
    const { bid, ask } = exchange.format(response.data, symbol);
    return {
      exchange: exchange.name,
      symbol: standardSymbol,
      bid: bid * (1 - commission / 100), // Adjust bid price by subtracting commission
      ask: ask * (1 + commission / 100), // Adjust ask price by adding commission
    };
  } catch (error) {
    console.error(
      `Error fetching price from ${exchange.name} for ${standardSymbol}: ${error}`
    );
    return null;
  }
}

export async function detectArbitrageOpportunities(config, includeCommissions) {
  const prices = await Promise.all(
    config.paresCriptomonedas
      .map((pair) =>
        exchanges.map((exchange) =>
          fetchPrice(
            exchange,
            pair,
            includeCommissions ? config.comisiones[exchange.name] : 0
          )
        )
      )
      .flat()
  );

  const validPrices = prices.filter((price) => price !== null);
  const opportunities = [];

  for (const buy of validPrices) {
    for (const sell of validPrices) {
      if (buy.exchange !== sell.exchange && buy.symbol === sell.symbol) {
        const potentialProfitPercentage =
          ((sell.bid - buy.ask) / buy.ask) * 100 -
          (includeCommissions
            ? (buy.ask * config.comisiones[buy.exchange]) / 100 +
              (sell.bid * config.comisiones[sell.exchange]) / 100
            : 0);

        if (potentialProfitPercentage > config.umbralRentabilidad) {
          opportunities.push({
            symbol: buy.symbol,
            buyExchange: buy.exchange,
            buyPrice: buy.ask,
            sellExchange: sell.exchange,
            sellPrice: sell.bid,
            profit: potentialProfitPercentage,
          });
        }
      }
    }
  }

  return opportunities;
}

// export const updateAndDetectArbitrage = async (req, res) => {
//   try {
//     const { capital, umbralRentabilidad } = req.body; // Receive settings from the user's input
//     const config = {
//       umbralRentabilidad: umbralRentabilidad || 0.01, // Use default if not provided
//       capital, // This could be used to filter opportunities based on potential transaction sizes
//       comisiones: {
//         Binance: 0.1,
//         Kraken: 0.21,
//         // Add other exchanges
//       },
//       paresCriptomonedas: ["BTC/USDT", "ETH/USDT", "LTC/USDT", "ADA/USDT"],
//     };
//     const opportunities = await detectArbitrageOpportunities(config);
//     res.json(opportunities);
//   } catch (error) {
//     console.error("Error detecting arbitrage opportunities: ", error);
//     res
//       .status(500)
//       .json({ message: "Error during arbitrage detection: " + error.message });
//   }
// };
