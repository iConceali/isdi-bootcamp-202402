// app/src/pages/ArbitrageOpportunities.jsx

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Container, Typography, Grid, CircularProgress } from "@mui/material";
import ArbitrageOpportunityCard from "../components/ArbitrageOpportunityCard";
import StandardArbitrageCard from "../components/StandardArbitrageCard";
import FilterOpportunities from "../components/FilterOpportunities";
import { motion } from "framer-motion"; // Importar motion

const ArbitrageOpportunities = () => {
  const [allOpportunities, setAllOpportunities] = useState([]);
  const [displayedOpportunities, setDisplayedOpportunities] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    exchanges: [
      "Binance",
      "Kraken",
      "Coinbase",
      "Bitfinex",
      "Crypto.com",
      "Gate.io",
      "KuCoin",
    ],
    profitThreshold: 0.1,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOpportunities = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/arbitrage/opportunities`
      );
      setAllOpportunities(response.data);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch arbitrage opportunities:", error);
      setError("Failed to fetch opportunities due to an error");
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchOpportunities();
    const intervalId = setInterval(fetchOpportunities, 10000);
    return () => clearInterval(intervalId);
  }, [fetchOpportunities]);

  useEffect(() => {
    const filtered = allOpportunities.filter(
      (opportunity) =>
        (!filters.type || opportunity.type === filters.type) &&
        (!opportunity.exchange ||
          filters.exchanges.includes(opportunity.exchange)) &&
        opportunity.profit >= filters.profitThreshold
    );
    setDisplayedOpportunities(filtered);
  }, [filters, allOpportunities]);

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  }, []);

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
                  // repeat: Infinity,
                  // repeatDelay: 1,
                }}
              >
                {opportunity.type === "triangular" ? (
                  <ArbitrageOpportunityCard opportunity={opportunity} />
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
