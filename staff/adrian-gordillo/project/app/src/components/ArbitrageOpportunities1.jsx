// app/src/components/ArbitrageOpportunities1.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  Box,
  Container,
} from "@mui/material";
import { green } from "@mui/material/colors";
import CommissionToggle from "./CommissionToggle";

const ArbitrageOpportunities1 = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [includeCommissions, setIncludeCommissions] = useState(true);

  useEffect(() => {
    const fetchOpportunities = () => {
      axios
        .get(
          `http://localhost:3000/api/arbitrage/detect?includeCommissions=${includeCommissions}`
        )
        .then((response) => setOpportunities(response.data))
        .catch((error) =>
          console.error("Failed to fetch arbitrage opportunities:", error)
        );
    };

    fetchOpportunities();
    const interval = setInterval(fetchOpportunities, 10000);
    return () => clearInterval(interval);
  }, [includeCommissions]);

  const getExchangeLogo = (exchange) => {
    const logos = {
      Binance: "/binance2.png",
      Kraken: "/kraken2.png",
      Coinbase: "/coinbase.png",
      Bitfinex: "/bitfinex.png",
      "Crypto.com": "/crypto.png",
      "Gate.io": "/gateio.png",
      KuCoin: "/kucoin.svg",
    };
    return logos[exchange] || "/placeholder.png";
  };

  const getLogoUrl = (symbol) => {
    // Ejemplo simple de mapeo, expandir según sea necesario
    const logos = {
      "BTC/USDT": "/BTC.png",
      "ETH/USDT":
        "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
      "LTC/USDT": "https://s2.coinmarketcap.com/static/img/coins/64x64/2.png",
      "ADA/USDT":
        "https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png",
      "SOL/USDT":
        "https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png",
      "DOT/USDT":
        "https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png",
      "MATIC/USDT":
        "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png",
    };
    return logos[symbol] || "/placeholder.png";
  };

  const calculateProfitPercentage = (buyPrice, sellPrice) => {
    return ((sellPrice - buyPrice) / buyPrice) * 100; // Calcula el porcentaje de ganancia
  };

  const calculateProfitDollars = (buyPrice, sellPrice) => {
    return sellPrice - buyPrice; // Calcula la ganancia en dólares
  };

  return (
    <Container>
      <Typography variant="h4" color="text.primary" sx={{ mb: 2 }}>
        Oportunidades de Arbitraje
      </Typography>
      <div>
        <CommissionToggle onToggle={setIncludeCommissions} />
        {/* Renderizar oportunidades aquí */}
      </div>
      <Grid container spacing={2}>
        {opportunities.map((op, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card
              sx={{
                backgroundColor: "#272A2F",
                borderRadius: 5,
                color: "black",
              }}
            >
              {" "}
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4} textAlign="center">
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Avatar
                        src={getExchangeLogo(op.buyExchange)}
                        alt={op.buyExchange}
                        sx={{ width: 56, height: 56, mb: 1 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Compras en {op.buyExchange}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        ${op.buyPrice.toFixed(2)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4} textAlign="center">
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Avatar
                        src={getLogoUrl(op.symbol)}
                        alt={op.symbol}
                        sx={{ width: 40, height: 40, mb: 1 }}
                      />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        {op.symbol}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        Ganancia
                      </Typography>
                      <Typography variant="h3" sx={{ color: green[500] }}>
                        {calculateProfitPercentage(
                          op.buyPrice,
                          op.sellPrice
                        ).toFixed(2)}
                        %
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ($
                        {calculateProfitDollars(
                          op.buyPrice,
                          op.sellPrice
                        ).toFixed(2)}
                        )
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4} textAlign="center">
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Avatar
                        src={getExchangeLogo(op.sellExchange)}
                        alt={op.sellExchange}
                        sx={{ width: 56, height: 56, mb: 1 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Vendes en {op.sellExchange}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        ${op.sellPrice.toFixed(2)}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ArbitrageOpportunities1;
