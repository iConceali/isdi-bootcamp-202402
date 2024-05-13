// app/src/services/watchlistService.js
import axios from "axios";

export const fetchWatchlist = async (userId) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/users/${userId}/watchlist`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  );
  const cryptoDetailsPromises = data.map((id) =>
    axios.get(`${import.meta.env.VITE_API_URL}/api/prices/crypto/${id}`)
  );
  const cryptoDetailsResponses = await Promise.all(cryptoDetailsPromises);
  return cryptoDetailsResponses.map((response) => response.data);
};

export const removeCryptoFromWatchlist = async (
  userId,
  cryptoId,
  setWatchlist
) => {
  await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/users/${userId}/watchlist/${cryptoId}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  );
  setWatchlist((currentWatchlist) =>
    currentWatchlist.filter((crypto) => crypto._id !== cryptoId)
  );
};
