// app/src/logic/watchlist/removeCryptoFromWatchlist.js

import axios from "axios";
import { validate } from "com";

// Función para eliminar una criptomoneda de la watchlist del usuario
const removeCryptoFromWatchlist = async (userId, cryptoId, setWatchlist) => {
  try {
    validate.text(userId, "userId");
    validate.text(cryptoId, "cryptoId");

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

export default removeCryptoFromWatchlist;
