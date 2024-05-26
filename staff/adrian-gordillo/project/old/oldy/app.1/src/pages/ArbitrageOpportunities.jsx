// app/src/pages/ArbitrageOpportunities.jsx

import React from "react";
import { Container, Typography, Grid, CircularProgress } from "@mui/material";
import StandardArbitrageCard from "../components/Arbitrage/StandardArbitrageCard";
import TriangularArbitrageCard from "../components/Arbitrage/TriangularArbitrageCard";
import FilterOpportunities from "../components/Arbitrage/FilterOpportunities";
import { useArbitrageOpportunities } from "../hooks/useArbitrageOpportunities";
import { motion } from "framer-motion";

const ArbitrageOpportunities = () => {
  const { displayedOpportunities, handleFiltersChange, isLoading, error } =
    useArbitrageOpportunities();
  console.log(displayedOpportunities);
  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4" color="text.primary" sx={{ mt: 5, mb: 4 }}>
        Oportunidades de Arbitraje
      </Typography>
      <FilterOpportunities onFiltersChange={handleFiltersChange} />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {displayedOpportunities.map((opportunity, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                animate={{ scale: [0, 1] }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  times: [0, 0.5, 0.8, 1],
                }}
              >
                {opportunity.type === "triangular" ? (
                  <TriangularArbitrageCard opportunity={opportunity} />
                ) : (
                  <StandardArbitrageCard opportunity={opportunity} />
                )}
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
      {error && (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      )}
    </Container>
  );
};

export default ArbitrageOpportunities;
