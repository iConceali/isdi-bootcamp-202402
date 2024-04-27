// app/src/components/ArbitrageOpportunityCard.jsx

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Grid,
  useTheme,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Asumiendo que estos logos son los correctos, si no, por favor reemplázalos con los adecuados.
const logos = {
  USDT: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
  BTC: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
  ETH: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
  BNB: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
  ADA: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
  XRP: "https://s2.coinmarketcap.com/static/img/coins/64x64/52.png",
  LTC: "https://s2.coinmarketcap.com/static/img/coins/64x64/2.png",
  DOT: "https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png",
  LINK: "https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png",
  DOGE: "https://s2.coinmarketcap.com/static/img/coins/64x64/74.png",
  AAVE: "https://s2.coinmarketcap.com/static/img/coins/64x64/7278.png",
  UNI: "https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png",
  VET: "https://s2.coinmarketcap.com/static/img/coins/64x64/3077.png",
  MANA: "https://s2.coinmarketcap.com/static/img/coins/64x64/1966.png",
  FIL: "https://s2.coinmarketcap.com/static/img/coins/64x64/2280.png",
  ATOM: "https://s2.coinmarketcap.com/static/img/coins/64x64/3794.png",
  CAKE: "https://s2.coinmarketcap.com/static/img/coins/64x64/7186.png",
  XLM: "https://s2.coinmarketcap.com/static/img/coins/64x64/512.png",
  MATIC: "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png",
};

const ArbitrageOpportunityCard = ({ opportunity }) => {
  const theme = useTheme();
  const getLogo = (symbol) => logos[symbol] || "/logos/default.png";

  // Asegúrate de que 'opportunity.trades' es un arreglo antes de usar 'map'
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
        <Typography
          variant="h5"
          component="div"
          sx={{ color: theme.palette.success.main, mb: 1, fontSize: "2rem" }}
        >
          {`${opportunity.profit.toFixed(2)}% Profit`}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          {`(${opportunity.profit.toFixed(2)} USDT)`}
        </Typography>
        {opportunity.trades && opportunity.trades.length > 0 ? (
          opportunity.trades.map((trade, index) => (
            <Box
              key={index}
              sx={{ my: 1, display: "flex", alignItems: "center" }}
            >
              <Avatar
                src={getLogo(trade.from)}
                sx={{ width: 30, height: 30 }}
              />
              <ArrowForwardIosIcon
                sx={{ mx: 1, color: theme.palette.action.active }}
              />
              <Avatar src={getLogo(trade.to)} sx={{ width: 30, height: 30 }} />
              <Typography
                variant="body2"
                sx={{ ml: 1, color: "text.secondary" }}
              >
                {index < opportunity.trades.length - 1
                  ? `Compra ${trade.amount.toFixed(4)} ${trade.to} con ${
                      trade.from
                    }`
                  : "Vende Todo"}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No hay operaciones para mostrar.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ArbitrageOpportunityCard;
