// app/src/pages/PriceData.jsx

import React, { useEffect, useState, useCallback } from "react";
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
import axios from "axios";

const PriceData = () => {
  const [prices, setPrices] = useState([]);
  const [favorites, setFavorites] = useState(new Set()); // Almacena los IDs de las criptos favoritas
  const [orderDirection, setOrderDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("symbol");

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/prices/crypto-prices`
        );
        setPrices(response.data);
        // Aquí deberías cargar también los favoritos del usuario
        fetchFavorites();
      } catch (error) {
        console.error("Error fetching price data:", error);
        setPrices([]);
      }
    };

    fetchPrices();
    const intervalId = setInterval(fetchPrices, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/watchlist`
      );
      setFavorites(new Set(response.data.map((crypto) => crypto._id)));
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const toggleFavorite = async (cryptoId) => {
    try {
      const method = favorites.has(cryptoId) ? "delete" : "put";
      await axios[method](
        `${import.meta.env.VITE_API_URL}/api/users/watchlist/${cryptoId}`
      );
      setFavorites((prev) => {
        const newFavorites = new Set(prev);
        if (newFavorites.has(cryptoId)) {
          newFavorites.delete(cryptoId);
        } else {
          newFavorites.add(cryptoId);
        }
        return newFavorites;
      });
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  const isFavorite = (cryptoId) => favorites.has(cryptoId);

  const sortedPrices = prices.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return orderDirection === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return orderDirection === "asc" ? 1 : -1;
    return 0;
  });

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
              <TableRow key={price._id}>
                <TableCell>
                  <IconButton onClick={() => toggleFavorite(price._id)}>
                    {isFavorite(price._id) ? (
                      <StarIcon color="secondary" />
                    ) : (
                      <StarBorderIcon />
                    )}
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
