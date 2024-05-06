import { Container, Typography, Box, Button } from "@mui/material";
import React from "react";

import cryptoStandard from "../assets/cryptoRegular.webp";
import cryptoTriangular from "../assets/cryptoTriangular.webp";
import cryptoIndicators from "../assets/cryptoIndicators.webp";

const Tools = () => {
  return (
    <Container id="tools">
      <Typography
        sx={{
          fontSize: "3rem",
          textAlign: "center",
          fontWeight: "bold",
          padding: "0.5rem 1rem",
          "#media (max-width: 442px)": {
            fontSize: "1.5rem",
          },
          marginBottom: "8rem",
          marginTop: "4rem",
        }}
      >
        Tools
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
          textAlign: "center",
          gap: "3rem",
          marginBottom: "2rem",
        }}
      >
        <Box
          sx={{
            transition: "0.3",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <img
            src={cryptoStandard}
            alt="crypto pic"
            style={{
              width: "15rem",
              height: "auto",
              borderRadius: "2rem",
              marginBottom: "4rem",
            }}
          />
          <Typography
            sx={{ width: "20rem", fontSize: "2rem", marginBottom: "1rem" }}
          >
            Standard Arbitrage Strategy
          </Typography>
          <Typography sx={{ width: "20rem" }}>
            Identifies and exploits price discrepancies of the same
            cryptocurrency across different exchanges for immediate profit.
          </Typography>

          <Button
            sx={{
              backgroundColor: "blue",
              color: "white",
              transition: "transform 0.3s",
              marginTop: "2rem",
              "&:hover": {
                transform: "scale(1.05)",
                backgroundImage: "linear-gradient(to bottom, #003eff, #006eff)",
              },
            }}
          >
            Get!
          </Button>
        </Box>

        <Box
          sx={{
            transition: "0.3",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <img
            src={cryptoTriangular}
            alt="crypto pic"
            style={{
              width: "15rem",
              height: "auto",
              borderRadius: "2rem",
              marginBottom: "4rem",
            }}
          />
          <Typography
            sx={{ width: "20rem", fontSize: "2rem", marginBottom: "1rem" }}
          >
            Triangular Arbitrage Strategy
          </Typography>
          <Typography sx={{ width: "20rem" }}>
            Involves trading three different cryptocurrencies on a single
            exchange to profit from currency exchange rate differences.
          </Typography>

          <Button
            sx={{
              backgroundColor: "blue",
              color: "white",
              transition: "transform 0.3s",
              marginTop: "2rem",
              "&:hover": {
                transform: "scale(1.05)",
                backgroundImage: "linear-gradient(to bottom, #003eff, #006eff)",
              },
            }}
          >
            Get!
          </Button>
        </Box>
        <Box
          sx={{
            transition: "0.3",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <img
            src={cryptoIndicators}
            alt="crypto pic"
            style={{
              width: "15rem",
              height: "auto",
              borderRadius: "2rem",
              marginBottom: "4rem",
            }}
          />
          <Typography
            sx={{ width: "20rem", fontSize: "2rem", marginBottom: "1rem" }}
          >
            Technical Indicators Strategy (Coming Soon)
          </Typography>
          <Typography sx={{ width: "20rem" }}>
            This future strategy will use technical indicators to automate buy
            and sell signals based on market trends.
          </Typography>

          <Button
            sx={{
              backgroundColor: "blue",
              color: "white",
              transition: "transform 0.3s",
              marginTop: "2rem",
              "&:hover": {
                transform: "scale(1.05)",
                backgroundImage: "linear-gradient(to bottom, #003eff, #006eff)",
              },
            }}
          >
            Get!
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Tools;
