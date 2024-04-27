// app/src/components/ArbitrageOpportunities.jsx

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Container, Typography, Grid, CircularProgress } from "@mui/material";
import ArbitrageOpportunityCard from "./ArbitrageOpportunityCard";
import StandardArbitrageCard from "./StandardArbitrageCard";
import FilterOpportunities from "./FilterOpportunities";

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

  // Optimizar la carga de oportunidades
  const fetchOpportunities = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/arbitrage/opportunities`
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
    fetchOpportunities(); // Fetch immediately on mount
    const intervalId = setInterval(fetchOpportunities, 10000); // Fetch every 10 seconds
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [fetchOpportunities]);

  useEffect(() => {
    // Aplicar filtros cuando cambien allOpportunities o filters
    const filtered = allOpportunities.filter((opportunity) => {
      return (
        (!filters.type || opportunity.type === filters.type) &&
        (filters.exchanges.length === 0 ||
          filters.exchanges.includes(opportunity.buyExchange) ||
          filters.exchanges.includes(opportunity.sellExchange)) &&
        opportunity.profit >= filters.profitThreshold
      );
    });
    setDisplayedOpportunities(filtered);
  }, [filters, allOpportunities]);

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" color="text.primary" sx={{ mt: 5, mb: 4 }}>
        Oportunidades de Arbitraje
      </Typography>
      <FilterOpportunities onFiltersChange={handleFiltersChange} />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={5}>
          {displayedOpportunities.map((opportunity, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              {opportunity.type === "triangular" ? (
                <ArbitrageOpportunityCard opportunity={opportunity} />
              ) : (
                <StandardArbitrageCard opportunity={opportunity} />
              )}
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
