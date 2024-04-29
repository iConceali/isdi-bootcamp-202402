// app/src/components/FeaturesSection.jsx

import React from "react";
import { Box, Typography, Grid } from "@mui/material";

function FeaturesSection() {
  return (
    <Box sx={{ py: 8, px: 4, bgcolor: "background.default" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Características Principales
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" align="center" color="primary" gutterBottom>
            Arbitraje Automático
          </Typography>
          <Typography align="center" color="text.secondary">
            Nuestros bots gestionan el arbitraje de manera automática, operando
            sin descanso para aprovechar cada oportunidad.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" align="center" color="primary" gutterBottom>
            Análisis en Tiempo Real
          </Typography>
          <Typography align="center" color="text.secondary">
            Proporcionamos datos actualizados del mercado para que tomes
            decisiones informadas al instante.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" align="center" color="primary" gutterBottom>
            Interfaz Intuitiva
          </Typography>
          <Typography align="center" color="text.secondary">
            Diseñada para facilitar su uso tanto a novatos como a expertos en el
            comercio de criptomonedas.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FeaturesSection;
