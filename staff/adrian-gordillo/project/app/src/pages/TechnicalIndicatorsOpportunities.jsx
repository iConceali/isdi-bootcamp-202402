// app/src/pages/TechnicalIndicatorsOpportunities.jsx

import React from "react";
import { Container, Typography, Grid, CircularProgress } from "@mui/material";
import IndicatorOpportunityCard from "../components/TechnicalIndicators/IndicatorOpportunityCard";
import FilterIndicators from "../components/TechnicalIndicators/FilterIndicators";
import { useTechnicalIndicators } from "../hooks/useTechnicalIndicators";
import { motion } from "framer-motion";

const TechnicalIndicatorsOpportunities = () => {
  const { filteredOpportunities, handleFilterChange, isLoading, error } =
    useTechnicalIndicators();
  // console.log(filteredOpportunities);
  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        Technical Indicator Opportunities
      </Typography>
      <FilterIndicators onFilterChange={handleFilterChange} />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {filteredOpportunities.map((opportunity, index) => (
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
                <IndicatorOpportunityCard opportunity={opportunity} />
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

export default TechnicalIndicatorsOpportunities;
