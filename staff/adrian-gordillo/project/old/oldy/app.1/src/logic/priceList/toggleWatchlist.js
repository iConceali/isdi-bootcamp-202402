// app/src/logic/priceList/toggleWatchlist.js

import axios from "axios";
import { validate, errors } from "com";
const { UnauthorizedError, ContentError } = errors;

// Función para agregar o quitar una criptomoneda de la watchlist del usuario
const toggleWatchlist = async (userId, cryptoId, isInWatchlist, setPrices) => {
  try {
    validate.text(userId, "userId"); // Validar el userId
    validate.text(cryptoId, "cryptoId"); // Validar el cryptoId

    const method = isInWatchlist ? "DELETE" : "POST";
    const url = `${
      import.meta.env.VITE_API_URL
    }/users/${userId}/watchlist/${cryptoId}`;

    await axios({
      method: method,
      url: url,
    });

    setPrices((currentPrices) =>
      currentPrices.map((price) => {
        if (price.id === cryptoId) {
          return { ...price, isInWatchlist: !isInWatchlist };
        }
        return price;
      })
    );
  } catch (error) {
    console.error("Error updating watchlist:", error);
    if (error instanceof UnauthorizedError || error instanceof ContentError) {
      throw error;
    } else {
      throw new Error("Failed to update watchlist");
    }
  }
};

export default toggleWatchlist;
