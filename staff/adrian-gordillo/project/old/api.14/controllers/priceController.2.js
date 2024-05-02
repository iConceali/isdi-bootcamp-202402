// api/controllers/priceController.js
import axios from "axios";
import CryptoPrice from "../models/CryptoPrice.js";

let intervalId = null; // Variable para almacenar el ID del intervalo

// Función para obtener y actualizar los precios
const fetchAndUpdatePrices = async () => {
  try {
    const response = await axios.get("https://api.coincap.io/v2/assets");
    const cryptos = response.data.data;

    const updates = cryptos.map((crypto) => {
      if (crypto && crypto.id && crypto.priceUsd) {
        return CryptoPrice.findOneAndUpdate(
          { symbol: crypto.id },
          { price: parseFloat(crypto.priceUsd) },
          { new: true, upsert: true }
        );
      }
    });

    await Promise.all(updates);
    console.log("Precios actualizados con éxito.");
  } catch (error) {
    console.error("Error al actualizar precios de criptomonedas:", error);
  }
};

// Configuración de actualización periódica
const updateCryptoPrices = () => {
  if (!intervalId) {
    // Comprobar si el intervalo ya está configurado
    fetchAndUpdatePrices(); // Llamar inmediatamente al iniciar
    intervalId = setInterval(fetchAndUpdatePrices, 10000); // Configurar intervalo
  }
};

export default updateCryptoPrices;
