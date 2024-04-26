// app/src/components/ArbitrageOpportunities2.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Grid } from "@mui/material";
import ArbitrageOpportunityCard from "./ArbitrageOpportunityCard";

const ArbitrageOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/arbitrage/triangular-detect"
        );
        if (
          response.data.opportunities &&
          response.data.opportunities.length > 0
        ) {
          setOpportunities(response.data.opportunities);
          setError(null);
        } else {
          setOpportunities([]);
          setError(
            <Typography variant="h3" color="text.secondary" sx={{ mt: 10 }}>
              No se encontraron oportunidades de arbitraje triangular.
            </Typography>
          );
        }
      } catch (error) {
        console.error(
          "Failed to fetch triangular arbitrage opportunities:",
          error
        );
        setOpportunities([]);
        setError(
          <Typography variant="h1" color="text.secondary" sx={{ mt: 4 }}>
            Error al buscar oportunidades de arbitraje.
          </Typography>
        );
      }
    };

    fetchOpportunities();
    const interval = setInterval(fetchOpportunities, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      {error ? (
        error
      ) : (
        <>
          <Typography
            variant="h5"
            color="text.primary"
            sx={{ mt: 4, mb: 4 }} // Ajuste el margen según sea necesario
          >
            Oportunidades de Arbitraje Triangular
          </Typography>
          <Grid container spacing={2} alignItems="flex-start">
            {opportunities.map((opportunity, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <ArbitrageOpportunityCard opportunity={opportunity} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default ArbitrageOpportunities;
