// app/src/components/Arbitrage/StandardArbitrageCard.jsx

import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  Box,
  useTheme,
} from "@mui/material";
import { green } from "@mui/material/colors";

const StandardArbitrageCard = ({ opportunity }) => {
  const theme = useTheme();

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

  const calculateProfitPercentage = (buyPrice, sellPrice) => {
    return ((sellPrice - buyPrice) / buyPrice) * 100;
  };

  const calculateProfitDollars = (buyPrice, sellPrice) => {
    return sellPrice - buyPrice;
  };

  return (
    <Card
      sx={{
        backgroundColor: "#272A2F",
        borderRadius: theme.shape.borderRadius,
        color: "white",
        my: 2,
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "375px",
        height: "225px",
        maxWidth: "100%",
        mx: "auto",
      }}
    >
      <CardContent>
        <Grid container spacing={7} alignItems="center">
          <Grid item xs={4} textAlign="center">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Avatar
                src={getExchangeLogo(opportunity.buyExchange)}
                alt={opportunity.buyExchange}
                sx={{ width: 56, height: 56, mb: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                Compras en {opportunity.buyExchange}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                ${opportunity.buyPrice.toFixed(2)}
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
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {opportunity.symbol}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                Ganancia
              </Typography>
              <Typography variant="h3" sx={{ color: green[500] }}>
                {calculateProfitPercentage(
                  opportunity.buyPrice,
                  opportunity.sellPrice
                ).toFixed(2)}
                %
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ($
                {calculateProfitDollars(
                  opportunity.buyPrice,
                  opportunity.sellPrice
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
                src={getExchangeLogo(opportunity.sellExchange)}
                alt={opportunity.sellExchange}
                sx={{ width: 56, height: 56, mb: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                Vendes en {opportunity.sellExchange}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                ${opportunity.sellPrice.toFixed(2)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StandardArbitrageCard;
