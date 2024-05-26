// app/src/components/Home/Header.jsx

import { Box, Button, Typography } from "@mui/material";
import React from "react";
import logo from "../../assets/logo.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Componente del encabezado con navegación y animaciones
const Header = () => {
  const navigate = useNavigate();

  return (
    <Box
      id="home"
      sx={{
        marginTop: "6rem",
        padding: "1rem",
        maxWidth: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            width: "40rem",
            textAlign: "center",
            paddingRight: "0.5rem",
            "@media (max-width: 442px)": {
              width: "20rem",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: "3rem",
              textAlign: "center",
              "@media (max-width: 442px)": {
                fontSize: "2rem",
              },
            }}
          >
            GainGate is a powerful cryptocurrency arbitrage platform
          </Typography>

          <Typography
            sx={{
              marginTop: "2rem",
              fontSize: "1.5rem",
              textAlign: "center",
              "@media (max-width: 442px)": {
                fontSize: "1rem",
              },
            }}
          >
            Maximize your cryptocurrency profits with our optimized arbitrage
            tool, which provides real-time information and direct access to
            optimal arbitrage opportunities across multiple exchanges.
          </Typography>

          <Button
            onClick={() => navigate("/login")}
            sx={{
              backgroundColor: "#003eff",
              color: "white",
              transition: "transform 0.3s",
              marginTop: "1rem",
              "&:hover": {
                transform: "scale(1.05)",
                backgroundImage: "linear-gradient(to bottom, #003eff, #006eff)",
              },
            }}
          >
            Start it
          </Button>
        </Box>

        <Box
          sx={{
            textAlign: "center",
            "@media (max-width: 442px)": {
              width: "15rem",
              marginRight: "10rem",
              marginTop: "2rem",
            },
          }}
        >
          <motion.div
            whileTap={{ scale: 0.8 }}
            animate={{ scale: [0, 1] }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              times: [0, 0.5, 0.8, 1],
            }}
          >
            <img
              src={logo}
              alt="logo Gain Gate"
              style={{
                maxWidth: "100%",
                height: "auto",
                width: "30rem",
                marginTop: "2rem",
                marginLeft: "5rem",
                filter: "drop-shadow(-10px 10px 5px rgba(0, 0, 0, 0.5))",
              }}
            />
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
