// app/src/hooks/useTechnicalIndicators.js

import { useState, useEffect, useCallback } from "react";
import fetchTechnicalOpportunities from "../logic/technicalIndicators/fetchTechnicalOpportunities";
import { validate, errors } from "com";
const { ContentError, SystemError } = errors;

// Maneja la lógica de oportunidades técnicas
export const useTechnicalIndicators = () => {
  const [allOpportunities, setAllOpportunities] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOpportunitiesData = useCallback(async () => {
    setIsLoading(true);
    try {
      const opportunities = await fetchTechnicalOpportunities();
      setAllOpportunities(opportunities);
      setFilteredOpportunities(opportunities); // Muestra todas las oportunidades inicialmente
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
    const intervalId = setInterval(fetchOpportunitiesData, 20000); // Actualiza cada 20 segundos
    return () => clearInterval(intervalId);
  }, [fetchOpportunitiesData]);

  const handleFilterChange = (symbol) => {
    try {
      validate.text(symbol, "Symbol");

      if (symbol === "") {
        setFilteredOpportunities(allOpportunities); // Si no hay filtro seleccionado, muestra todo
      } else {
        const filtered = allOpportunities.filter(
          (opportunity) => opportunity.symbol === symbol
        );
        setFilteredOpportunities(filtered); // Aplica el filtro sobre todas las oportunidades
      }
    } catch (error) {
      console.error("Error filtering opportunities:", error);
      setError("Invalid filter parameters");
    }
  };

  return {
    filteredOpportunities,
    handleFilterChange,
    isLoading,
    error,
  };
};
