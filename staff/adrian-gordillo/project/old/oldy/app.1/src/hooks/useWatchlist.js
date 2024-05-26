// app/src/hooks/useWatchlist.js

import { useState, useEffect } from "react";
import fetchWatchlist from "../logic/watchlist/fetchWatchlist";
import removeCryptoFromWatchlist from "../logic/watchlist/removeCryptoFromWatchlist";
import getLoggedInUserId from "../logic/getLoggedInUserId";
import { validate, errors } from "com";

const { UnauthorizedError, ContentError } = errors;

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [orderDirection, setOrderDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("symbol");

  const userId = getLoggedInUserId();

  useEffect(() => {
    const fetchAndUpdateWatchlist = async () => {
      try {
        validate.token(sessionStorage.getItem("token"));

        if (userId) {
          const fetchedWatchlist = await fetchWatchlist(userId);
          setWatchlist(fetchedWatchlist);
        }
      } catch (error) {
        console.error("Error fetching watchlist:", error);
        setWatchlist([]); // Limpia la watchlist en caso de error
      }
    };

    fetchAndUpdateWatchlist();
    const intervalId = setInterval(fetchAndUpdateWatchlist, 10000);
    return () => clearInterval(intervalId);
  }, [userId]);

  const handleSort = (property) => {
    const isAsc = orderBy === property && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedWatchlist = watchlist.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return orderDirection === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return orderDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleRemoveFromWatchlist = async (cryptoId) => {
    try {
      validate.text(cryptoId, "cryptoId");

      if (!userId) {
        throw new UnauthorizedError("No user ID found or user not logged in");
      }

      await removeCryptoFromWatchlist(userId, cryptoId);
      setWatchlist((currentWatchlist) =>
        currentWatchlist.filter((crypto) => crypto.id !== cryptoId)
      );
    } catch (error) {
      console.error("Error removing from watchlist:", error);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return {
    watchlist: sortedWatchlist,
    orderDirection,
    orderBy,
    handleSort,
    handleRemoveFromWatchlist,
  };
};

// fetchAndUpdateWatchlist();
// const intervalId = setInterval(fetchAndUpdateWatchlist, 10000);
// return () => clearInterval(intervalId);
// }, [userId]);
