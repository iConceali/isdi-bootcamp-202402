// app/src/components/PriceData.jsx

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
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import axios from "axios";

const PriceData = () => {
  const [prices, setPrices] = useState([]);
  const [orderBy, setOrderBy] = useState("symbol");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    const fetchPrices = () => {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/prices/crypto-prices`)
        .then((response) => {
          setPrices(response.data);
        })
        .catch((error) => {
          console.error("Error fetching price data:", error);
          setPrices([]);
        });
    };

    fetchPrices();
    const intervalId = setInterval(fetchPrices, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortData = (data) => {
    return data.sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
      return 0;
    });
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
              <TableCell>#</TableCell>
              <TableCell onClick={() => handleSort("symbol")}>Symbol</TableCell>
              <TableCell onClick={() => handleSort("price")}>Price</TableCell>
              <TableCell onClick={() => handleSort("change")}>24 %</TableCell>
              <TableCell onClick={() => handleSort("marketCap")}>
                Market Cap
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortData(prices).map((price, index) => (
              <TableRow key={price.symbol}>
                <TableCell>
                  <IconButton>
                    <StarBorderIcon />
                  </IconButton>
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{price.symbol.toUpperCase()}</TableCell>
                <TableCell>${price.price.toFixed(2)}</TableCell>
                <TableCell>{price.change.toFixed(2)}%</TableCell>
                <TableCell>${price.marketCap.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PriceData;
