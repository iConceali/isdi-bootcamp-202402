// api/controllers/priceController.js

import axios from "axios";
import CryptoPrice from "../models/CryptoPrice.js";

function getUrl(exchange, symbol) {
  if (exchange.name === "Coinbase") {
    return `${exchange.url}${symbol}/spot`; // Manejo especial para Coinbase
  } else {
    return `${exchange.url}${symbol}`; // Formato común para otros exchanges
  }
}

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
    format: (symbol, data) => ({
      pair: symbol.replace("USDT", "/USDT"),
      price: parseFloat(data.price),
    }),
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
    format: (symbol, data) => ({
      pair: symbol
        .replace("XXBTZUSD", "BTC/USDT")
        .replace("XETHZUSD", "ETH/USDT")
        .replace("XLTCZUSD", "LTC/USDT")
        .replace("ADAUSD", "ADA/USDT")
        .replace("SOLUSD", "SOL/USDT")
        .replace("DOTUSD", "DOT/USDT")
        .replace("MATICUSD", "MATIC/USDT"),
      price: parseFloat(data.result[symbol].c[0]),
    }),
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
    format: (symbol, data) => ({
      pair: symbol.replace("-USD", "/USDT"),
      price: parseFloat(data.data.amount),
    }),
  },
  {
    name: "Bitfinex",
    url: "https://api-pub.bitfinex.com/v2/ticker/",
    symbols: ["tBTCUSD", "tETHUSD", "tLTCUSD", "tADAUSD", "tSOLUSD", "tDOTUSD"],
    format: (symbol, data) => ({
      pair: symbol.substring(1, 4) + "/USDT",
      price: parseFloat(data[6]),
    }),
  },
  // Crypto.com
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
    format: (symbol, data) => ({
      pair: symbol.replace("_", "/"),
      price: parseFloat(data.result.data[0].a),
    }),
  },
  // Gate.io
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
    format: (symbol, data) => ({
      pair: symbol.replace("_", "/"),
      price: parseFloat(data[0].last),
    }),
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
    format: (symbol, data) => ({
      pair: symbol.replace("-", "/"),
      price: parseFloat(data.data.price), // Asumiendo que el último precio está en 'price'
    }),
  },
];

const getCryptoPrices = async (req, res) => {
  try {
    const pricePromises = exchanges.flatMap((exchange) =>
      exchange.symbols.map((symbol) =>
        axios
          .get(getUrl(exchange, symbol))
          .then((response) => {
            const formattedPrice = exchange.format(symbol, response.data);
            return CryptoPrice.findOneAndUpdate(
              { pair: formattedPrice.pair, exchange: exchange.name },
              {
                $set: { price: formattedPrice.price, exchange: exchange.name },
              },
              { new: true, upsert: true }
            );
          })
          .catch((error) => {
            console.error(
              `Error fetching data from ${exchange.name} for ${symbol}:`,
              error.message
            );
            return null; // Continuar con el próximo símbolo si falla uno
          })
      )
    );

    await Promise.all(pricePromises);
    const prices = await CryptoPrice.find();
    res.json(prices);
  } catch (error) {
    console.error("Error processing crypto prices", error);
    res.status(500).send({ message: "Failed to process crypto prices" });
  }
};

export default getCryptoPrices;
