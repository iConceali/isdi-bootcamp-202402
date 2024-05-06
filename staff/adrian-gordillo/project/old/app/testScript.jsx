import React, { useEffect, useState } from "react";
import { Container, Typography, Grid } from "@mui/material";
import TechnicalIndicatorOpportunityCard from "../components/TechnicalIndicatorOpportunityCard";
import FilterIndicators from "../components/FilterIndicators";
import axios from "axios";

const TechnicalIndicatorsOpportunities = () => {
  const [allOpportunities, setAllOpportunities] = useState([]); // Almacena todas las oportunidades
  const [displayedOpportunities, setDisplayedOpportunities] = useState([]); // Almacena las oportunidades filtradas

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/technical-indicator-opportunities/technical-opportunities"
        );
        console.log("Data from server:", data); // Verifica el formato de la respuesta
        setAllOpportunities(data);
        setDisplayedOpportunities(data); // Inicialmente muestra todas las oportunidades
      } catch (error) {
        console.error("Error fetching opportunities:", error);
      }
    };

    fetchOpportunities();
  }, []);

  const handleFilterChange = (symbol) => {
    if (symbol === "") {
      setDisplayedOpportunities(allOpportunities); // Si no hay filtro seleccionado, muestra todo
    } else {
      const filtered = allOpportunities.filter(
        (opportunity) => opportunity.symbol === symbol
      );
      setDisplayedOpportunities(filtered); // Aplica el filtro sobre todas las oportunidades
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        Technical Indicator Opportunities
      </Typography>
      <FilterIndicators onFilterChange={handleFilterChange} />
      <Grid container spacing={3}>
        {displayedOpportunities.map((opportunity, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <TechnicalIndicatorOpportunityCard opportunity={opportunity} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TechnicalIndicatorsOpportunities;
