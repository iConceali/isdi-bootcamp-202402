// app/src/hooks/usePriceList.js

import { useState, useEffect } from "react";
import fetchPricesAndCheckWatchlist from "../logic/priceList/fetchPricesAndCheckWatchlist";
import toggleWatchlist from "../logic/priceList/toggleWatchlist";
import getLoggedInUserId from "../logic/getLoggedInUserId";
import { validate, errors } from "com";
const { UnauthorizedError, ContentError } = errors;

// maneja la lógica de la lista de precios
export const usePriceList = () => {
  const [prices, setPrices] = useState([]);
  const [orderDirection, setOrderDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("symbol");
  const userId = getLoggedInUserId();

  useEffect(() => {
    const fetchAndUpdatePrices = async () => {
      try {
        validate.token(sessionStorage.getItem("token"));

        if (userId) {
          const updatedPrices = await fetchPricesAndCheckWatchlist(userId);
          setPrices(updatedPrices);
        } else {
          console.log(
            "No user ID available, user may not be logged in or token is invalid"
          );
          setPrices([]);
        }
      } catch (error) {
        console.error(error);
        if (error instanceof UnauthorizedError) {
          alert("Session expired. Please log in again.");
        } else {
          alert("An unexpected error occurred. Please try again later.");
        }
      }
    };

    fetchAndUpdatePrices();
    const intervalId = setInterval(fetchAndUpdatePrices, 10000);
    return () => clearInterval(intervalId);
  }, [userId]);

  const handleSort = (property) => {
    const isAsc = orderBy === property && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedPrices = prices.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return orderDirection === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return orderDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleToggleWatchlist = async (cryptoId, isInWatchlist) => {
    try {
      await toggleWatchlist(userId, cryptoId, isInWatchlist, setPrices);
    } catch (error) {
      console.error(error);
      alert(`Error: ${error.message}`);
    }
  };

  return {
    prices: sortedPrices,
    orderDirection,
    orderBy,
    handleSort,
    handleToggleWatchlist,
  };
};
