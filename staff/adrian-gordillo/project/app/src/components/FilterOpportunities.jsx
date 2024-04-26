// app/src/components/FilterOpportunities.jsx

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

const FilterOpportunities = ({ onFiltersChange }) => {
  const [type, setType] = useState(""); // Valor por defecto a "All"
  const [selectedExchanges, setSelectedExchanges] = useState([]);
  const [profitThreshold, setProfitThreshold] = useState(0.1);
  const [openExchanges, setOpenExchanges] = useState(false);

  const exchanges = [
    "Binance",
    "Kraken",
    "Coinbase",
    "Bitfinex",
    "Crypto.com",
    "Gate.io",
    "KuCoin",
  ];

  useEffect(() => {
    setSelectedExchanges(exchanges); // Inicia con todos los exchanges seleccionados
  }, [exchanges]);

  const handleExchangeToggle = (exchange) => {
    setSelectedExchanges((prev) =>
      prev.includes(exchange)
        ? prev.filter((x) => x !== exchange)
        : [...prev, exchange]
    );
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleProfitThresholdChange = (event, newValue) => {
    setProfitThreshold(newValue);
  };

  const handleApplyFilters = () => {
    onFiltersChange({
      type,
      selectedExchanges,
      profitThreshold,
    });
    setOpenExchanges(false);
  };

  return (
    <div>
      <FormGroup>
        <FormControl fullWidth>
          <InputLabel>Tipo de Oportunidad</InputLabel>
          <Select
            value={type}
            label="Tipo de Oportunidad"
            onChange={handleTypeChange}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value="standard">Standard</MenuItem>
            <MenuItem value="triangular">Triangular</MenuItem>
          </Select>
        </FormControl>
        <Button variant="outlined" onClick={() => setOpenExchanges(true)}>
          Elegir Exchanges
        </Button>
        <Dialog onClose={() => setOpenExchanges(false)} open={openExchanges}>
          <List>
            {exchanges.map((exchange) => (
              <ListItem
                key={exchange}
                button
                onClick={() => handleExchangeToggle(exchange)}
              >
                <ListItemText primary={exchange} />
                <Checkbox
                  edge="end"
                  checked={selectedExchanges.includes(exchange)}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItem>
            ))}
          </List>
          <Button onClick={handleApplyFilters}>Aplicar Filtros</Button>
        </Dialog>
        <Typography gutterBottom>Umbral de Rentabilidad (%)</Typography>
        <Slider
          value={profitThreshold}
          min={0.1}
          max={10}
          step={0.1}
          valueLabelDisplay="auto"
          onChange={handleProfitThresholdChange}
        />
        <Button
          onClick={handleApplyFilters}
          color="primary"
          variant="contained"
        >
          Aplicar Filtros
        </Button>
      </FormGroup>
    </div>
  );
};

export default FilterOpportunities;
