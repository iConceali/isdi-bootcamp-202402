// app/src/hooks/useArbitrageOpportunities.js

import { useState, useEffect, useCallback } from "react";
import fetchOpportunities from "../logic/arbitrage/fetchOpportunities";
import { validate, errors } from "com";
const { ContentError, SystemError } = errors;

// Maneja la lógica de oportunidades de arbitraje
export const useArbitrageOpportunities = () => {
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

  const fetchOpportunitiesData = useCallback(async () => {
    setIsLoading(true);
    try {
      const opportunities = await fetchOpportunities();
      setAllOpportunities(opportunities);
      setError(null);
    } catch (error) {
      if (error instanceof ContentError || error instanceof SystemError) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchOpportunitiesData();
    const intervalId = setInterval(fetchOpportunitiesData, 10000);
    return () => clearInterval(intervalId);
  }, [fetchOpportunitiesData]);

  useEffect(() => {
    try {
      // Validaciones de filtros
      validate.number(filters.profitThreshold, "Profit Threshold");
      if (filters.type) {
        // Solo validar si el filtro type no está vacío
        validate.text(filters.type, "Filter Type", false);
      }

      const filtered = allOpportunities.filter(
        (opportunity) =>
          (!filters.type || opportunity.type === filters.type) &&
          (!opportunity.exchange ||
            filters.exchanges.includes(opportunity.exchange)) &&
          opportunity.profit >= filters.profitThreshold
      );
      setDisplayedOpportunities(filtered);
    } catch (error) {
      console.error("Error filtering opportunities:", error);
      setError("Invalid filter parameters");
    }
  }, [filters, allOpportunities]);

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  }, []);

  return {
    displayedOpportunities,
    filters,
    handleFiltersChange,
    isLoading,
    error,
  };
};
