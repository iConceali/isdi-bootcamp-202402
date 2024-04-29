// app/src/components/HeroSection.jsx

import React from "react";
import { Box, Typography, Button } from "@mui/material";

function HeroSection() {
  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
        backgroundImage:
          'url("https://source.unsplash.com/random/1920x1080?crypto,cryptocurrency")',
        backgroundSize: "cover",
        color: "#fff",
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        Maximiza tus Ganancias con Arbitraje Crypto
      </Typography>
      <Typography variant="h5" align="center" paragraph>
        Conectamos múltiples exchanges de criptomonedas para detectar y explotar
        diferencias de precio en tiempo real.
      </Typography>
      <Button variant="contained" size="large" sx={{ mt: 2 }}>
        Explora Ahora
      </Button>
    </Box>
  );
}

export default HeroSection;
