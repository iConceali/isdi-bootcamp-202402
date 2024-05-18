// app/src/services/watchlistService.js

import axios from "axios";
import { validate, errors } from "com";

const { ContentError } = errors;

// Función para obtener la watchlist del usuario desde la API
export const fetchWatchlist = async (userId) => {
  try {
    validate.text(userId, "userId"); // Validar el userId

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/users/${userId}/watchlist`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    const { data } = response;
    if (!data.watchlist || !Array.isArray(data.watchlist)) {
      throw new ContentError("Expected an array but got something else");
    }

    // Obtiene los detalles de cada criptomoneda en la watchlist
    const cryptoDetailsPromises = data.watchlist.map((id) =>
      axios.get(`${import.meta.env.VITE_API_URL}/prices/crypto/${id}`)
    );
    const cryptoDetailsResponses = await Promise.all(cryptoDetailsPromises);
    return cryptoDetailsResponses.map((response) => response.data);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch watchlist");
  }
};

// Función para eliminar una criptomoneda de la watchlist del usuario
export const removeCryptoFromWatchlist = async (
  userId,
  cryptoId,
  setWatchlist
) => {
  try {
    validate.text(userId, "userId"); // Validar el userId
    validate.text(cryptoId, "cryptoId"); // Validar el cryptoId

    await axios.delete(
      `${import.meta.env.VITE_API_URL}/users/${userId}/watchlist/${cryptoId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    setWatchlist((currentWatchlist) =>
      currentWatchlist.filter((crypto) => crypto._id !== cryptoId)
    );
  } catch (error) {
    console.error(error);
    throw new Error("Failed to remove crypto from watchlist");
  }
};
