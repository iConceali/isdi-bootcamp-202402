// app/src/pages/TechnicalIndicatorsOpportunities.jsx

import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, CircularProgress } from "@mui/material";
import TechnicalIndicatorOpportunityCard from "../components/TechnicalIndicatorOpportunityCard";
import FilterIndicators from "../components/FilterIndicators";
import axios from "axios";
import { motion } from "framer-motion"; // Importa motion

const TechnicalIndicatorsOpportunities = () => {
  const [allOpportunities, setAllOpportunities] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOpportunities = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        "http://localhost:3000/technical-indicator-opportunities/technical-opportunities"
      );
      setAllOpportunities(data);
      setFilteredOpportunities(data); // Muestra todas las oportunidades inicialmente
      setError(null);
    } catch (error) {
      console.error("Error fetching opportunities:", error);
      setError("Failed to fetch opportunities due to an error");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOpportunities();
    const intervalId = setInterval(fetchOpportunities, 20000); // Establece que la actualización sea cada minuto
    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonte
  }, []);

  const handleFilterChange = (symbol) => {
    if (symbol === "") {
      setFilteredOpportunities(allOpportunities); // Si no hay filtro seleccionado, muestra todo
    } else {
      const filtered = allOpportunities.filter(
        (opportunity) => opportunity.symbol === symbol
      );
      setFilteredOpportunities(filtered); // Aplica el filtro sobre todas las oportunidades
    }
  };

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
                <TechnicalIndicatorOpportunityCard opportunity={opportunity} />
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
