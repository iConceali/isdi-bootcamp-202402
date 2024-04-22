import axios from "axios";
// import sendNotificationEmail from "./mailer.js";

const exchanges = [
  {
    name: "Binance",
    url: "https://api.binance.com/api/v3/ticker/price?symbol=",
    format: (data) => parseFloat(data.price),
  },
  {
    name: "Kraken",
    url: "https://api.kraken.com/0/public/Ticker?pair=",
    format: (data, symbol) => {
      const key = Object.keys(data.result)[0];
      return parseFloat(data.result[key].c[0]);
    },
  },
  {
    name: "Coinbase",
    url: "https://api.coinbase.com/v2/prices/",
    format: (data) => parseFloat(data.data.amount),
    endpointSuffix: "/spot",
  },
  {
    name: "Bitfinex",
    url: "https://api-pub.bitfinex.com/v2/ticker/",
    format: (data) => parseFloat(data[6]),
  },
  {
    name: "Crypto.com",
    url: "https://api.crypto.com/v2/public/get-ticker?instrument_name=",
    format: (data) => parseFloat(data.result.data[0].a),
  },
  {
    name: "Gate.io",
    url: "https://api.gateio.ws/api/v4/spot/tickers?currency_pair=",
    format: (data) => parseFloat(data[0].last),
  },
  {
    name: "KuCoin",
    url: "https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=",
    format: (data) => parseFloat(data.data.price),
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
  // Add more mappings for other cryptocurrency pairs
};

async function fetchPrice(exchange, standardSymbol, commission = 0) {
  if (!symbolMappings[standardSymbol]) {
    console.error(
      `No se encontraron mapeos para ${standardSymbol}. Por favor, revisa tu configuración de symbolMappings.`
    );
    return null;
  }
  if (!symbolMappings[standardSymbol][exchange.name]) {
    console.error(
      `No se encontró mapeo de símbolo para ${exchange.name} y ${standardSymbol}. Por favor, revisa tu configuración de symbolMappings.`
    );
    return null;
  }

  const symbol = symbolMappings[standardSymbol][exchange.name];
  const url = exchange.url + symbol + (exchange.endpointSuffix || "");
  try {
    const response = await axios.get(url);
    const price = exchange.format(response.data, symbol);
    return {
      exchange: exchange.name,
      symbol: standardSymbol,
      price: price * (1 - commission / 100),
    };
  } catch (error) {
    console.error(
      `Error al obtener el precio de ${exchange.name} para ${standardSymbol}:`,
      error
    );
    return null;
  }
}

export async function detectArbitrageOpportunities(config) {
  const prices = await Promise.all(
    exchanges.flatMap((exchange) =>
      config.paresCriptomonedas.map((pair) =>
        fetchPrice(exchange, pair, config.comisiones[exchange.name] || 0)
      )
    )
  );

  const validPrices = prices.filter((price) => price);
  const opportunities = [];

  for (const buy of validPrices) {
    for (const sell of validPrices) {
      if (buy.exchange !== sell.exchange && buy.symbol === sell.symbol) {
        const potentialProfit =
          sell.price -
          buy.price -
          (buy.price * (config.comisiones[buy.exchange] || 0)) / 100 -
          (sell.price * (config.comisiones[sell.exchange] || 0)) / 100;
        if (potentialProfit > config.umbralRentabilidad) {
          const opportunity = {
            symbol: buy.symbol,
            buyExchange: buy.exchange,
            buyPrice: buy.price,
            sellExchange: sell.exchange,
            sellPrice: sell.price,
            profit: potentialProfit,
          };
          opportunities.push(opportunity);
          // sendNotificationEmail({
          //   subject: "Arbitrage Opportunity Detected",
          //   body: `Buy at ${buy.exchange} for ${buy.price} and sell at ${sell.exchange} for ${sell.price}. Potential profit: ${potentialProfit}.`,
          // });
        }
      }
    }
  }

  return opportunities;
}
