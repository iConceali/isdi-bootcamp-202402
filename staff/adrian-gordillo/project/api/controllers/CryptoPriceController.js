// api/controllers/priceController.js

import {
  fetchCryptoPrices,
  findCryptoById,
} from "../logic/CryptoPriceService.js";

export const updateCryptoPrices = async (req, res) => {
  try {
    const updatedPrices = await fetchCryptoPrices();
    res.status(200).json(updatedPrices);
  } catch (error) {
    console.error(
      "Error al obtener y actualizar precios de criptomonedas:",
      error
    );
    res
      .status(500)
      .json({ message: "Error al procesar precios de criptomonedas" });
  }
};

export const getCryptoById = async (req, res) => {
  try {
    const { id } = req.params;
    const crypto = await findCryptoById(id);
    if (!crypto) {
      return res.status(404).json({ message: "Cryptocurrency not found" });
    }
    res.status(200).json(crypto);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching cryptocurrency", error: error.message });
  }
};
