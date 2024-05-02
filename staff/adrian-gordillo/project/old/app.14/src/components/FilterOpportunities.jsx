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
  const [type, setType] = useState("");
  const [selectedExchanges, setSelectedExchanges] = useState([]);
  const [profitThreshold, setProfitThreshold] = useState(0.02);
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
    setSelectedExchanges(exchanges);
  }, []);

  useEffect(() => {
    onFiltersChange({
      type,
      exchanges: selectedExchanges,
      profitThreshold,
    });
  }, [type, selectedExchanges, profitThreshold, onFiltersChange]);

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

  return (
    <div>
      <FormGroup>
        <FormControl fullWidth sx={{ mb: 1 }}>
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
        <Button
          variant="outlined"
          onClick={() => setOpenExchanges(true)}
          sx={{ mb: 1 }}
        >
          Elegir Exchanges
        </Button>
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
        </Dialog>
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
