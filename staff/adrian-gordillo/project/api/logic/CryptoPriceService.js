// api/services/priceService.js

import axios from "axios";
import CryptoPrice from "../models/CryptoPriceModel.js";

export const fetchCryptoPrices = async () => {
  const response = await axios.get("https://api.coincap.io/v2/assets");
  const cryptos = response.data.data;

  const updates = cryptos.map((crypto) => {
    return CryptoPrice.findOneAndUpdate(
      { symbol: crypto.id },
      {
        price: parseFloat(crypto.priceUsd),
        price24Hr: parseFloat(crypto.changePercent24Hr),
        marketCap: crypto.marketCapUsd,
      },
      { new: true, upsert: true }
    );
  });

  await Promise.all(updates);
  return await CryptoPrice.find();
};

export const findCryptoById = async (id) => {
  return await CryptoPrice.findById(id);
};
