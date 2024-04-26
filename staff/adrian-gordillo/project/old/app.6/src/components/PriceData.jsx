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
  Tabs,
  Tab,
  Box,
  TableContainer,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";

const exchangeIcons = {
  Binance: "/binance.png",
  Kraken: "/kraken.png",
  Coinbase: "/coinbase.png",
  Bitfinex: "/bitfinex.png",
  "Crypto.com": "/crypto.png",
  "Gate.io": "/gateio.png",
  KuCoin: "/kucoin.svg",
};

const PriceData = () => {
  const [prices, setPrices] = useState([]);
  const [selectedTab, setSelectedTab] = useState("BTC/USDT");
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchPrices = () => {
      axios
        .get("http://localhost:3000/api/prices/crypto-prices")
        .then((response) => setPrices(response.data))
        .catch((error) => {
          console.error("Error fetching price data:", error);
          setPrices([]);
        });
    };

    fetchPrices();
    const intervalId = setInterval(fetchPrices, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ Width: "100%", mx: "auto", p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Crypto Prices
      </Typography>
      <Tabs
        value={selectedTab}
        onChange={handleChangeTab}
        variant={matches ? "scrollable" : "standard"}
        scrollButtons={matches ? "auto" : false} // Corregido aquí
        allowScrollButtonsMobile
        centered={!matches}
      >
        {[
          "BTC/USDT",
          "ETH/USDT",
          "LTC/USDT",
          "ADA/USDT",
          "SOL/USDT",
          "DOT/USDT",
          "MATIC/USDT",
        ].map((pair) => (
          <Tab key={pair} label={pair} value={pair} />
        ))}
      </Tabs>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table aria-label="crypto prices table">
          <TableHead>
            <TableRow>
              <TableCell>Exchange</TableCell>
              <TableCell align="right">Pair</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prices
              .filter((price) => price.pair === selectedTab)
              .map((price, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <img
                        src={exchangeIcons[price.exchange]}
                        alt={price.exchange}
                        style={{ width: 24, height: 24 }}
                      />
                      {price.exchange}
                    </Box>
                  </TableCell>
                  <TableCell align="right">{price.pair}</TableCell>
                  <TableCell align="right">${price.price}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PriceData;
