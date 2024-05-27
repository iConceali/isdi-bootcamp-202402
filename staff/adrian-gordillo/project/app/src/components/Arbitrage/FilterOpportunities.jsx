// app/src/components/Arbitrage/FilterOpportunities.jsx

import React, { useState, useEffect } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Button,
  Dialog,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

// Componente para filtrar oportunidades de arbitraje
const FilterOpportunities = ({ onFiltersChange }) => {
  // Define estados locales del componente
  const [type, setType] = useState(""); // Estado para el tipo de oportunidad
  const [selectedExchanges, setSelectedExchanges] = useState([]); // Estado para los exchanges seleccionados
  const [profitThreshold, setProfitThreshold] = useState(0.02); // Estado para el umbral de rentabilidad
  const [openExchanges, setOpenExchanges] = useState(false); // Estado para el diálogo de selección de exchanges

  // Lista de exchanges disponibles
  const exchanges = [
    "Binance",
    "Kraken",
    "Coinbase",
    "Bitfinex",
    "Crypto.com",
    "Gate.io",
    "KuCoin",
  ];

  // Efecto para inicializar los exchanges seleccionados
  useEffect(() => {
    setSelectedExchanges(exchanges); // Selecciona todos los exchanges por defecto
  }, []);

  // Efecto para notificar cambios en los filtros
  useEffect(() => {
    onFiltersChange({
      type,
      exchanges: selectedExchanges,
      profitThreshold,
    });
  }, [type, selectedExchanges, profitThreshold, onFiltersChange]); // Se ejecuta cuando cambian type, selectedExchanges o profitThreshold

  // Maneja el cambio de selección de exchanges
  const handleExchangeToggle = (exchange) => {
    setSelectedExchanges(
      (prev) =>
        prev.includes(exchange)
          ? prev.filter((x) => x !== exchange) // Des-selecciona el exchange si ya estaba seleccionado
          : [...prev, exchange] // Selecciona el exchange si no estaba seleccionado
    );
  };

  // Maneja el cambio de tipo de oportunidad
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  // Maneja el cambio del umbral de rentabilidad
  const handleProfitThresholdChange = (event, newValue) => {
    setProfitThreshold(newValue);
  };

  return (
    <div>
      <FormGroup>
        {/* Selector de tipo de oportunidad */}
        <FormControl fullWidth sx={{ mb: 1 }}>
          <InputLabel>Tipo de Oportunidad</InputLabel>
          <Select
            value={type}
            label="Tipo de Oportunidad"
            onChange={handleTypeChange}
          >
            <MenuItem value="">
              <em>All</em> {/* Opción para seleccionar todos los tipos */}
            </MenuItem>
            <MenuItem value="standard">Standard</MenuItem>
            <MenuItem value="triangular">Triangular</MenuItem>
          </Select>
        </FormControl>

        {/* Botón para abrir el diálogo de selección de exchanges */}
        <Button
          variant="outlined"
          onClick={() => setOpenExchanges(true)}
          sx={{ mb: 1 }}
        >
          Elegir Exchanges
        </Button>

        {/* Diálogo para seleccionar exchanges */}
        <Dialog
          onClose={() => setOpenExchanges(false)}
          open={openExchanges}
          sx={{ mb: 1 }}
        >
          <List>
            {exchanges.map((exchange) => (
              <ListItem
                key={exchange}
                button
                onClick={() => handleExchangeToggle(exchange)}
              >
                <ListItemText primary={exchange} /> {/* Nombre del exchange */}
                <Checkbox
                  edge="end"
                  checked={selectedExchanges.includes(exchange)}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItem>
            ))}
          </List>
        </Dialog>

        {/* Control deslizante para seleccionar el umbral de rentabilidad */}
        <Typography gutterBottom>Umbral de Rentabilidad (%)</Typography>
        <Slider
          value={profitThreshold}
          min={0.02}
          max={1}
          step={0.01}
          valueLabelDisplay="auto"
          onChange={handleProfitThresholdChange}
          sx={{ mb: 1 }}
        />
      </FormGroup>
    </div>
  );
};

export default FilterOpportunities;
