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
};

const ArbitrageOpportunityCard = ({ opportunity }) => {
  const theme = useTheme();
  const getLogo = (symbol) => logos[symbol] || "/logos/default.png";

  // Aquí deberás calcular el profit en la moneda utilizada para la compra (en este caso, USDT).
  const profitInBaseCurrency =
    opportunity.trades.reduce((acc, trade) => acc + trade.amount, 0) *
    (opportunity.profit / 100);

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
        width: "fit-content",
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
          {`(${profitInBaseCurrency.toFixed(2)} USDT)`}
        </Typography>
        {opportunity.trades.map((trade, index) => (
          <Box
            key={index}
            sx={{ my: 1, display: "flex", alignItems: "center" }}
          >
            <Avatar src={getLogo(trade.from)} sx={{ width: 30, height: 30 }} />
            <ArrowForwardIosIcon
              sx={{ mx: 1, color: theme.palette.action.active }}
            />
            <Avatar src={getLogo(trade.to)} sx={{ width: 30, height: 30 }} />
            <Typography variant="body2" sx={{ ml: 1, color: "text.secondary" }}>
              {index < opportunity.trades.length - 1
                ? `Compra ${trade.amount.toFixed(4)} ${trade.to} con ${
                    trade.from
                  }`
                : "Vende Todo"}
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default ArbitrageOpportunityCard;
