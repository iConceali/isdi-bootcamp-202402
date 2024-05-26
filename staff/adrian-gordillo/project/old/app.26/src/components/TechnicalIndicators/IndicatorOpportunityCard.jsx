// app/src/components/TechnicalIndicators/IndicatorOpportunityCard.jsx

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  useTheme,
  Box,
  Avatar,
} from "@mui/material";
import { green } from "@mui/material/colors";

// Logos de las criptomonedas
const logos = {
  BTCUSDT: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
  ETHUSDT: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
  BNBUSDT: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
  ADAUSDT: "https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png",
  XRPUSDT: "https://s2.coinmarketcap.com/static/img/coins/64x64/52.png",
  DOTUSDT: "https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png",
  SOLUSDT: "https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png",
  DOGEUSDT: "https://s2.coinmarketcap.com/static/img/coins/64x64/74.png",
  AVAXUSDT: "https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png",
  TRXUSDT: "https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png",
  BCHUSDT: "https://s2.coinmarketcap.com/static/img/coins/64x64/1831.png",
  LINKUSDT: "https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png",
  NEARUSDT: "https://s2.coinmarketcap.com/static/img/coins/64x64/6535.png",
  MATICUSDT: "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png",
  LTCUSDT: "https://s2.coinmarketcap.com/static/img/coins/64x64/2.png",
};

// Componente para mostrar las oportunidades técnicas
const IndicatorOpportunityCard = ({ opportunity }) => {
  const theme = useTheme();

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
        width: "80%",
        height: "80%",
        maxWidth: "100%",
        mx: "auto",
      }}
    >
      <CardContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Avatar
            src={logos[opportunity.symbol]}
            sx={{ width: 56, height: 56, mb: 1 }}
            alt={opportunity.symbol}
          />
          <Typography variant="h5" gutterBottom>
            {opportunity.symbol}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {opportunity.strategy}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            RSI: {opportunity.rsi}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Stochastic: {opportunity.stochastic}
          </Typography>
          <Typography variant="h6" color={green[500]} sx={{ mt: 2 }}>
            {opportunity.message}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default IndicatorOpportunityCard;
