// app/src/components/ArbitrageOpportunities.jsx

import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchOpportunities = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/arbitrage/opportunities`
        );
        setAllOpportunities(response.data);
        applyFilters();
      } catch (error) {
        console.error("Failed to fetch arbitrage opportunities:", error);
        setError("Failed to fetch opportunities due to an error");
      }
      setIsLoading(false);
    };

    fetchOpportunities(); // Fetch immediately on mount
    const intervalId = setInterval(fetchOpportunities, 10000); // Fetch every 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    // Esta función se llama en cada cambio de filtro para aplicarlos de nuevo
    applyFilters();
  }, [filters, allOpportunities]);

  const applyFilters = () => {
    if (!Array.isArray(allOpportunities) || allOpportunities.length === 0) {
      console.log(allOpportunities);
      console.log("No opportunities data available for filtering.");
      setDisplayedOpportunities([]);
      return;
    }

    const filtered = allOpportunities.filter((opportunity) => {
      if (
        !opportunity ||
        !opportunity.type ||
        !opportunity.buyExchange ||
        !opportunity.sellExchange ||
        typeof opportunity.profit !== "number"
      ) {
        return false;
      }

      const meetsType = !filters.type || opportunity.type === filters.type;
      const meetsExchange =
        Array.isArray(filters.exchanges) &&
        (filters.exchanges.length === 0 ||
          filters.exchanges.includes(opportunity.buyExchange) ||
          filters.exchanges.includes(opportunity.sellExchange));
      const meetsProfitThreshold =
        opportunity.profit >= filters.profitThreshold;

      return meetsType && meetsExchange && meetsProfitThreshold;
    });

    setDisplayedOpportunities(filtered);
  };

  const handleFiltersChange = (newFilters) => {
    // Asegúrate de que los nuevos filtros estén completos y correctamente formateados antes de actualizar
    if (
      newFilters &&
      typeof newFilters === "object" &&
      !Array.isArray(newFilters)
    ) {
      setFilters(newFilters);
    } else {
      console.error("Invalid filters received:", newFilters);
    }
  };

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
          {displayedOpportunities.map((opportunity, index) => {
            const CardComponent =
              opportunity.type === "triangular"
                ? ArbitrageOpportunityCard
                : StandardArbitrageCard;
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <CardComponent opportunity={opportunity} />
              </Grid>
            );
          })}
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
