// app/src/hooks/useWatchlist.js

import { useState, useEffect } from "react";
import fetchWatchlist from "../logic/watchlist/fetchWatchlist";
import removeCryptoFromWatchlist from "../logic/watchlist/removeCryptoFromWatchlist";
import getLoggedInUserId from "../logic/getLoggedInUserId";
import { validate, errors } from "com";

const { UnauthorizedError, ContentError } = errors;

// useWatchlist es un hook personalizado que maneja la lógica de la watchlist
export const useWatchlist = () => {
  // Estado para almacenar la watchlist del usuario
  const [watchlist, setWatchlist] = useState([]);
  // Estado para almacenar la dirección del ordenamiento (ascendente o descendente)
  const [orderDirection, setOrderDirection] = useState("asc");
  // Estado para almacenar la columna por la que se está ordenando
  const [orderBy, setOrderBy] = useState("symbol");

  // Obtiene el ID del usuario desde el token de sesión
  const userId = getLoggedInUserId();

  useEffect(() => {
    // Función para obtener y actualizar la watchlist
    const fetchAndUpdateWatchlist = () => {
      try {
        validate.token(sessionStorage.getItem("token"));

        if (userId) {
          fetchWatchlist(userId)
            .then(setWatchlist)
            .catch((error) => {
              console.error("Error fetching watchlist:", error);
              setWatchlist([]); // Limpia la watchlist en caso de error
            });
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

    fetchAndUpdateWatchlist();
    const intervalId = setInterval(fetchAndUpdateWatchlist, 10000);
    return () => clearInterval(intervalId);
  }, [userId]);

  // Función para manejar el ordenamiento de la tabla
  const handleSort = (property) => {
    const isAsc = orderBy === property && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Ordena la watchlist según la columna seleccionada
  const sortedWatchlist = watchlist.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return orderDirection === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return orderDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Función para manejar la eliminación de una criptomoneda de la watchlist
  const handleRemoveFromWatchlist = (cryptoId) => {
    try {
      validate.text(cryptoId, "cryptoId"); // Validar el cryptoId

      if (!userId) {
        throw new UnauthorizedError("No user ID found or user not logged in");
      }

      removeCryptoFromWatchlist(userId, cryptoId, setWatchlist).catch(
        (error) => {
          console.error("Error removing from watchlist:", error);
          alert(`Error: ${error.response?.data?.message || error.message}`);
        }
      );
    } catch (error) {
      console.error(error);
      if (error instanceof ContentError || error instanceof UnauthorizedError) {
        alert(error.message);
      } else {
        alert("An unexpected error occurred. Please try again later.");
      }
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
