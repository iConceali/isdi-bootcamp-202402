// app/src/logic/watchlist/fetchWatchlist.js

import axios from "axios";
import { validate, errors } from "com";
const { ContentError } = errors;

const fetchWatchlist = async (userId) => {
  try {
    validate.text(userId, "userId");

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
    const cryptoDetailsPromises = data.watchlist.map((crypto) => {
      if (!crypto.id) {
        throw new ContentError("Crypto item missing 'id' property");
      }
      return axios.get(
        `${import.meta.env.VITE_API_URL}/cryptoData/crypto/${crypto.id}`
      );
    });

    const cryptoDetailsResponses = await Promise.all(cryptoDetailsPromises);
    return cryptoDetailsResponses.map((response) => response.data);
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    throw new Error("Failed to fetch watchlist");
  }
};

export default fetchWatchlist;
