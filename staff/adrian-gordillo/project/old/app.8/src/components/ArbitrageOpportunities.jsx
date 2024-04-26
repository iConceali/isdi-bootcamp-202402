// app/src/components/ArbitrageOpportunities.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Grid } from "@mui/material";
import ArbitrageOpportunityCard from "./ArbitrageOpportunityCard";
import StandardArbitrageCard from "./StandardArbitrageCard";

const ArbitrageOpportunities = () => {
  const [triangularOpportunities, setTriangularOpportunities] = useState([]);
  const [standardOpportunities, setStandardOpportunities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTriangularArbitrage = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/arbitrage/triangular-detect"
        );
        if (
          response.data.opportunities &&
          response.data.opportunities.length > 0
        ) {
          setTriangularOpportunities(response.data.opportunities);
        } else {
          setTriangularOpportunities([]);
        }
      } catch (error) {
        console.error(
          "Failed to fetch triangular arbitrage opportunities:",
          error
        );
      }
    };

    const fetchStandardArbitrage = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/arbitrage/detect?includeCommissions=true"
        );
        if (response.data.length > 0) {
          setStandardOpportunities(response.data);
        } else {
          setStandardOpportunities([]);
        }
      } catch (error) {
        console.error(
          "Failed to fetch standard arbitrage opportunities:",
          error
        );
      }
    };

    fetchTriangularArbitrage();
    fetchStandardArbitrage();
    const interval = setInterval(() => {
      fetchTriangularArbitrage();
      fetchStandardArbitrage();
    }, 5000); // Actualizar cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" color="text.primary" sx={{ mt: 5, mb: 4 }}>
        Oportunidades de Arbitraje
      </Typography>
      <Grid container spacing={5}>
        {triangularOpportunities.map((opportunity, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ArbitrageOpportunityCard opportunity={opportunity} />
          </Grid>
        ))}
        {standardOpportunities.map((opportunity, index) => (
          <Grid item xs={12} sm={6} md={4} key={`standard-${index}`}>
            <StandardArbitrageCard opportunity={opportunity} />
          </Grid>
        ))}
      </Grid>
      {error && (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      )}
    </Container>
  );
};

export default ArbitrageOpportunities;

// import React from "react";

// import ArbitrageOpportunities1 from "./ArbitrageOpportunities1";
// import ArbitrageOpportunities2 from "./ArbitrageOpportunities2";
// import { Box } from "@mui/material";

// const Opportunities = () => {
//   return (
//     <Box>
//       <ArbitrageOpportunities1 />
//       <ArbitrageOpportunities2 />
//     </Box>
//   );
// };

// export default Opportunities;
