// app/src/logic/watchlist/removeCryptoFromWatchlist.js

import axios from "axios";
import { validate } from "com";

const removeCryptoFromWatchlist = async (userId, cryptoId) => {
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
  } catch (error) {
    console.error(error);
    throw new Error("Failed to remove crypto from watchlist");
  }
};

export default removeCryptoFromWatchlist;
