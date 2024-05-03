// api/controllers/priceController.js

import axios from "axios";
import CryptoPrice from "../models/CryptoPrice.js";

export const updateCryptoPrices = async (req, res) => {
  try {
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

export const getCryptoById = async (req, res) => {
  try {
    const { id } = req.params;
    const crypto = await CryptoPrice.findById(id);
    if (!crypto) {
      return res.status(404).json({ message: "Cryptocurrency not found" });
    }
    res.json(crypto);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching cryptocurrency", error: error.message });
  }
};
