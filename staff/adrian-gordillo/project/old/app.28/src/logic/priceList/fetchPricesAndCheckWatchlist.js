// app/src/logic/priceList/fetchPricesAndCheckWatchlist.js

import axios from "axios";
import { validate, errors } from "com";
const { ContentError } = errors;

// Función para obtener los precios de criptomonedas y verificar la watchlist del usuario
const fetchPricesAndCheckWatchlist = async (userId) => {
  try {
    validate.text(userId, "userId");

    const pricesResponse = await axios.get(
      `${import.meta.env.VITE_API_URL}/prices/crypto-prices`
    );

    let watchlistIds = [];
    if (userId) {
      const watchlistResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${userId}/watchlist`
      );
      console.log("Watchlist Response Data:", watchlistResponse.data);
      watchlistIds = watchlistResponse.data.watchlist.map(
        (crypto) => crypto.id
      );
    }

    const updatedPrices = pricesResponse.data.map((price) => ({
      ...price,
      isInWatchlist: watchlistIds.includes(price.id),
    }));

    return updatedPrices;
  } catch (error) {
    console.error("Error fetching price data or watchlist:", error);
    throw new ContentError("Failed to fetch prices or watchlist");
  }
};

export default fetchPricesAndCheckWatchlist;
