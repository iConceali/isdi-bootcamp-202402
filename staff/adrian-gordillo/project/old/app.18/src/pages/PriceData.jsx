// app/src/pages/PriceData.jsx

import { useUser } from "../userContext";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Box,
  TableContainer,
  IconButton,
  TableSortLabel,
  Avatar,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import axios from "axios";

const getIconUrl = (symbol) =>
  `../public/crypto-icon/${symbol.toLowerCase()}.png`;

const PriceData = () => {
  const [prices, setPrices] = useState([]);
  const [orderDirection, setOrderDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("symbol");
  const { user } = useUser();

  useEffect(() => {
    const fetchPricesAndCheckWatchlist = async () => {
      try {
        // Obtiene los precios de las criptomonedas desde el API.
        const pricesResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/prices/crypto-prices`
        );

        let watchlistIds = [];

        // Verifica si hay un usuario y un ID de usuario disponible
        if (user && user._id) {
          try {
            // Obtiene la watchlist del usuario usando su ID
            const watchlistResponse = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/users/${user._id}/watchlist`
            );
            watchlistIds = watchlistResponse.data; // Esto debería ser un array de IDs de las criptomonedas en la watchlist
          } catch (error) {
            console.error("Error fetching watchlist:", error);
          }
        }

        // Combina los datos de los precios con la información de la watchlist
        const updatedPrices = pricesResponse.data.map((price) => ({
          ...price,
          isInWatchlist: watchlistIds.includes(price._id), // Marca si cada criptomoneda está en la watchlist
        }));

        // Actualiza el estado de los precios con los datos combinados
        setPrices(updatedPrices);
      } catch (error) {
        console.error("Error fetching price data:", error);
        setPrices([]); // En caso de error, limpia la lista de precios
      }
    };

    fetchPricesAndCheckWatchlist();
    const intervalId = setInterval(fetchPricesAndCheckWatchlist, 10000);
    return () => clearInterval(intervalId);
  }, [user]); // La dependencia [user] asegura que los datos se actualicen cuando el usuario inicie sesión, cierre sesión o cambie.

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

  const toggleWatchlist = async (cryptoId, isInWatchlist) => {
    if (!user || !user._id) {
      console.error("No user ID found or user not logged in");
      return;
    }

    try {
      const method = isInWatchlist ? "DELETE" : "POST";
      const url = `${import.meta.env.VITE_API_URL}/api/users/${
        user._id
      }/watchlist${method === "DELETE" ? "/" + cryptoId : ""}`;
      await axios({
        method: method,
        url: url,
        data: method === "POST" ? { cryptoId } : {},
      });

      // Actualizar el estado de prices para reflejar los cambios inmediatamente en la UI
      setPrices(
        prices.map((price) => {
          if (price._id === cryptoId) {
            return { ...price, isInWatchlist: !isInWatchlist };
          }
          return price;
        })
      );
    } catch (error) {
      console.error("Error updating watchlist:", error);
      alert(`Error: ${error.response.data}`); // Mostrar mensaje de error desde el servidor
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", p: 2 }}>
      <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
        Crypto Prices
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 3, borderRadius: "10px" }}
      >
        <Table
          sx={{ backgroundColor: "#272A2F" }}
          aria-label="crypto prices table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "1rem" }}></TableCell>
              <TableCell sx={{ width: "1rem" }}>#</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "symbol"}
                  direction={orderDirection}
                  onClick={() => handleSort("symbol")}
                >
                  Symbol
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "price"}
                  direction={orderDirection}
                  onClick={() => handleSort("price")}
                >
                  Price
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "price24Hr"}
                  direction={orderDirection}
                  onClick={() => handleSort("price24Hr")}
                >
                  24 %
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "marketCap"}
                  direction={orderDirection}
                  onClick={() => handleSort("marketCap")}
                >
                  Market Cap
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedPrices.map((price, index) => (
              <TableRow key={price.symbol}>
                <TableCell>
                  <IconButton
                    onClick={() =>
                      toggleWatchlist(price._id, price.isInWatchlist)
                    }
                  >
                    {price.isInWatchlist ? <StarIcon /> : <StarBorderIcon />}
                  </IconButton>
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar
                      src={getIconUrl(price.symbol)}
                      alt={price.symbol}
                      sx={{ width: 24, height: 24 }}
                    />
                    {price.symbol.toUpperCase()}
                  </Box>
                </TableCell>
                <TableCell>
                  ${price.price ? price.price.toFixed(2) : "N/A"}
                </TableCell>
                <TableCell
                  sx={{
                    color: price.price24Hr >= 0 ? "green" : "red",
                    animation: "blinking 2s infinite",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {price.price24Hr >= 0 ? (
                      <ArrowDropUpIcon />
                    ) : (
                      <ArrowDropDownIcon />
                    )}
                    {Math.abs(price.price24Hr).toFixed(2)}%
                  </Box>
                </TableCell>

                <TableCell>
                  ${parseFloat(price.marketCap).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PriceData;
