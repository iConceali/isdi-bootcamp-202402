// api/services/cryptoData/fetchCryptoData.js

import axios from "axios";
import CryptoData from "../../models/CryptoData.js";
import { errors, validate } from "com";

const { SystemError } = errors;

// Función para obtener datos de criptomonedas
const fetchCryptoData = async () => {
  try {
    console.log("Fetching crypto prices from API...");
    const response = await axios.get("https://api.coincap.io/v2/assets");
    console.log("API response received.");

    const cryptos = response.data.data;

    const updates = cryptos.map((crypto) => {
      try {
        validate.text(crypto.id, "crypto ID");

        const price = parseFloat(crypto.priceUsd);
        const price24Hr = parseFloat(crypto.changePercent24Hr);
        const marketCap = parseFloat(crypto.marketCapUsd);

        validate.number(price, "crypto price");
        validate.number(price24Hr, "crypto price change 24Hr");
        validate.number(marketCap, "crypto market cap");

        // Encuentra y actualiza (o crea si no existe) la lista de datos de criptomoneda en la base de datos con los nuevos valores
        return CryptoData.findOneAndUpdate(
          { symbol: crypto.id },
          {
            price: price,
            price24Hr: price24Hr,
            marketCap: marketCap,
          },
          { new: true, upsert: true }
        ).lean();
      } catch (validationError) {
        console.error("Validation error:", validationError.message);
        throw new SystemError(`Validation failed for crypto ${crypto.id}`);
      }
    });

    await Promise.all(updates);
    console.log("Database updated with new crypto prices.");
    const sanitizedCryptos = (await CryptoData.find().lean()).map((crypto) => {
      const { _id, __v, ...rest } = crypto;
      return {
        id: _id.toString(),
        ...rest,
      };
    });
    return sanitizedCryptos;
  } catch (error) {
    console.error("Error fetching or updating crypto prices:", error.message);
    throw new SystemError("Failed to fetch crypto prices");
  }
};

export default fetchCryptoData;
