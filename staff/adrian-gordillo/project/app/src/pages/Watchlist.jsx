// app/src/pages/Watchlist.jsx

import React, { useEffect, useState } from "react";
import getLoggedInUserId from "../logic/getLoggedInUserId"; // Asegúrate de que la ruta es correcta
import {
  fetchWatchlist,
  removeCryptoFromWatchlist,
} from "../logic/watchlistService";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  TableContainer,
  TableSortLabel,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [orderDirection, setOrderDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("symbol");
  const userId = getLoggedInUserId(); // Obtiene el userId directamente del token

  useEffect(() => {
    const fetchAndUpdateWatchlist = () => {
      if (userId) {
        fetchWatchlist(userId).then(setWatchlist).catch(console.error);
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

  const handleRemoveFromWatchlist = (cryptoId) => {
    if (!userId) {
      console.error("No user ID found or user not logged in");
      return;
    }
    removeCryptoFromWatchlist(userId, cryptoId, setWatchlist).catch((error) => {
      console.error("Error removing from watchlist:", error);
      alert(`Error: ${error.response.data.message || error.message}`);
    });
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", p: 2 }}>
      <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
        Your Watchlist
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
                  24h%
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
            {sortedWatchlist.map((crypto, index) => (
              <TableRow key={crypto._id}>
                <TableCell>
                  <IconButton
                    onClick={() => handleRemoveFromWatchlist(crypto._id)}
                  >
                    <StarIcon sx={{ color: "gold" }} />
                  </IconButton>
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar
                      src={`../public/crypto-icon/${crypto.symbol.toLowerCase()}.png`}
                      alt={crypto.symbol}
                      sx={{ width: 24, height: 24 }}
                    />
                    {crypto.symbol.toUpperCase()}
                  </Box>
                </TableCell>
                <TableCell>${crypto.price.toFixed(2)}</TableCell>
                <TableCell
                  sx={{
                    color: crypto.price24Hr >= 0 ? "green" : "red",
                    animation: "blinking 2s infinite",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {crypto.price24Hr >= 0 ? (
                      <ArrowDropUpIcon />
                    ) : (
                      <ArrowDropDownIcon />
                    )}
                    {`${crypto.price24Hr.toFixed(2)}%`}
                  </Box>
                </TableCell>
                <TableCell>
                  {crypto.marketCap
                    ? parseFloat(crypto.marketCap).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                    : "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Watchlist;
