// api/services/cryptoPrices/fetchCryptoPrices.js

import axios from "axios";
import CryptoPrice from "../../models/CryptoPrice.js";
import { errors, validate } from "com";

const { SystemError } = errors;

const fetchCryptoPrices = async () => {
  try {
    console.log("Fetching crypto prices from API...");
    const response = await axios.get("https://api.coincap.io/v2/assets");
    console.log("API response received.");

    const cryptos = response.data.data;

    const updates = cryptos.map((crypto) => {
      try {
        validate.text(crypto.id, "crypto ID");

        const price = parseFloat(crypto.priceUsd);
        const priceChange = parseFloat(crypto.changePercent24Hr);
        const marketCap = parseFloat(crypto.marketCapUsd);

        validate.number(price, "crypto price");
        validate.number(priceChange, "crypto price change 24Hr");
        validate.number(marketCap, "crypto market cap");

        return CryptoPrice.findOneAndUpdate(
          { symbol: crypto.id },
          {
            price: price,
            price24Hr: priceChange,
            marketCap: marketCap,
          },
          { new: true, upsert: true }
        );
      } catch (validationError) {
        console.error("Validation error:", validationError.message);
        throw new SystemError(`Validation failed for crypto ${crypto.id}`);
      }
    });

    await Promise.all(updates);
    console.log("Database updated with new crypto prices.");
    return await CryptoPrice.find();
  } catch (error) {
    console.error("Error fetching or updating crypto prices:", error.message);
    throw new SystemError("Failed to fetch crypto prices");
  }
};

export default fetchCryptoPrices;
