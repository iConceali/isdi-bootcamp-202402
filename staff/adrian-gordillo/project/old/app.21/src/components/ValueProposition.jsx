// app/src/components/ValueProposition.jsx

import { Box, Typography } from "@mui/material";
import React from "react";

const ValueProposition = () => {
  return (
    <Box
      id="value"
      sx={{
        marginTop: "6rem",
        textAlign: "center",
        marginBottom: "2rem",
      }}
    >
      <Typography
        sx={{
          fontSize: "3rem",
          fontWeight: "bold",
          color: "#FFFFFF",
          padding: "0.5rem 1rem",
          borderRadius: "10px",
          "@media (max-width: 442px)": {
            fontSize: "2rem", // Reduce el tamaño de la fuente en pantallas pequeñas
          },
        }}
      >
        Explore Our Features
      </Typography>

      <Box
        sx={{
          marginTop: "2rem",
          backgroundColor: "#1A2239",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          "@media (max-width: 442px)": {
            padding: "5rem",
          },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Dual Arbitrage Strategies
        </Typography>
        <Typography
          sx={{
            fontSize: "1.1rem",
            color: "#CCCCCC",
          }}
        >
          Dive into the world of cryptocurrency trading with two solid arbitrage
          strategies: Standard and Triangular. Our app analyzes real-time price
          discrepancies between exchanges for direct arbitrage and exploits
          price differences between exchange and cryptocurrencies.
        </Typography>

        {/* Repetir para los otros párrafos también */}

        <Typography
          variant="h5"
          sx={{
            // color: "#FFFFFF",
            fontWeight: "bold",
            marginTop: "3rem",
            marginBottom: "1rem",
          }}
        >
          Real-time price monitoring
        </Typography>
        <Typography sx={{ fontSize: "1.1rem", color: "#CCCCCC" }}>
          Stay ahead of the market with live updates on cryptocurrency prices
          from various exchanges. Our app provides instant access to current
          rates, allowing you to make quick decisions based on the most
          up-to-date market data, ensuring you never miss out on a lucrative
          arbitrage opportunity.
        </Typography>

        <Typography
          variant="h5"
          sx={{
            // color: "#FFFFFF",
            fontWeight: "bold",
            marginTop: "3rem",
            marginBottom: "1rem",
          }}
        >
          Tracking business performance
        </Typography>
        <Typography sx={{ fontSize: "1.1rem", color: "#CCCCCC" }}>
          Keep a detailed record of all your trading activities within our app.
          Monitor your past arbitrage trades, analyze your results and refine
          your strategies. This comprehensive tracking helps you evaluate the
          effectiveness of your operations and plan future moves more
          accurately.
        </Typography>
      </Box>
    </Box>
  );
};

export default ValueProposition;
