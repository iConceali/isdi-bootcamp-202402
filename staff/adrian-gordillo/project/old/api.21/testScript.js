// api/controllers/priceController.js

import axios from "axios";
import CryptoPrice from "../models/CryptoPrice.js";

const updateCryptoPrices = async (req, res) => {
  try {
    const response = await axios.get("https://api.coincap.io/v2/assets");
    const cryptos = response.data.data;

    const updates = cryptos.map((crypto) => {
      return CryptoPrice.findOneAndUpdate(
        { symbol: crypto.id },
        {
          price: parseFloat(crypto.priceUsd),
          changePercent24Hr: parseFloat(crypto.changePercent24Hr),
          marketCapUsd: crypto.marketCapUsd,
        },
        { new: true, upsert: true }
      );
    });

    await Promise.all(updates);
    const updatedPrices = await CryptoPrice.find();
    res.json(updatedPrices);
  } catch (error) {
    console.error(
      "Error al obtener y actualizar precios de criptomonedas:",
      error
    );
    res
      .status(500)
      .send({ message: "Error al procesar precios de criptomonedas" });
  }
};

export default updateCryptoPrices;
