// app/src/components/AboutSection.jsx

import React from "react";
import { Box, Typography, Grid } from "@mui/material";

function AboutSection() {
  return (
    <Box sx={{ py: 8, px: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Acerca de Arbitraje Crypto
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Arbitraje Crypto es tu herramienta para acceder al mercado de
        criptomonedas con una estrategia de inversión basada en el arbitraje,
        aprovechando diferencias de precios entre exchanges para generar
        ganancias de forma segura.
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" align="center" color="primary">
            Tecnología Avanzada
          </Typography>
          <Typography paragraph color="text.secondary" align="center">
            Utilizamos algoritmos de última generación para identificar
            oportunidades de arbitraje en milisegundos.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" align="center" color="primary">
            Seguridad de Fondos
          </Typography>
          <Typography paragraph color="text.secondary" align="center">
            Todos los fondos están asegurados y las operaciones se ejecutan con
            las máximas medidas de seguridad.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" align="center" color="primary">
            Soporte Dedicado
          </Typography>
          <Typography paragraph color="text.secondary" align="center">
            Ofrecemos soporte técnico 24/7 para asegurar que tus operaciones se
            ejecuten sin contratiempos.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AboutSection;
