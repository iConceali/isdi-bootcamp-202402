// app/src/pages/Watchlist.jsx

import React, { useEffect, useState } from "react";
import { useUser } from "../userContext";
import axios from "axios";
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
  const { user } = useUser();

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (user && user._id) {
        try {
          const idsResponse = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/users/${user._id}/watchlist`,
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          );
          const cryptoDetailsPromises = idsResponse.data.map((id) =>
            axios.get(`${import.meta.env.VITE_API_URL}/api/prices/crypto/${id}`)
          );
          const cryptoDetailsResponses = await Promise.all(
            cryptoDetailsPromises
          );
          const cryptos = cryptoDetailsResponses.map(
            (response) => response.data
          );
          setWatchlist(cryptos);
        } catch (error) {
          console.error("Error fetching Watchlist:", error);
        }
      }
    };

    fetchWatchlist();
    const intervalId = setInterval(fetchWatchlist, 10000);
    return () => clearInterval(intervalId);
  }, [user]);

  const removeCryptoFromWatchlist = async (cryptoId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/users/${
          user._id
        }/watchlist/${cryptoId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setWatchlist(watchlist.filter((crypto) => crypto._id !== cryptoId));
    } catch (error) {
      console.error("Error removing crypto from Watchlist:", error);
    }
  };

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
            {sortedWatchlist.length > 0 ? (
              sortedWatchlist.map((crypto, index) => (
                <TableRow key={crypto._id}>
                  <TableCell>
                    <IconButton
                      onClick={() => removeCryptoFromWatchlist(crypto._id)}
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
                      {crypto.price24Hr !== undefined
                        ? `${crypto.price24Hr.toFixed(2)}%`
                        : "N/A"}
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} style={{ textAlign: "center" }}>
                  No cryptocurrencies in your watchlist.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Watchlist;
