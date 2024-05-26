// app/src/components/TechnicalIndicators/FilterIndicators.jsx

import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";

// Componente para filtrar oportunidades técnicas
const FilterIndicators = ({ onFilterChange }) => {
  const [selectedSymbol, setSelectedSymbol] = useState("");

  const handleChange = (event) => {
    setSelectedSymbol(event.target.value);
    onFilterChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, marginBottom: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="symbol-select-label">Symbol</InputLabel>
        <Select
          labelId="symbol-select-label"
          id="symbol-select"
          value={selectedSymbol}
          label="Symbol"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value={"BTCUSDT"}>BTCUSDT</MenuItem>
          <MenuItem value={"ETHUSDT"}>ETHUSDT</MenuItem>
          <MenuItem value={"DOTUSDT"}>DOTUSDT</MenuItem>
          <MenuItem value={"BNBUSDT"}>BNBUSDT</MenuItem>
          <MenuItem value={"SOLUSDT"}>SOLUSDT</MenuItem>
          <MenuItem value={"XRPUSDT"}>XRPUSDT</MenuItem>
          <MenuItem value={"ADAUSDT"}>ADAUSDT</MenuItem>
          <MenuItem value={"DOGEUSDT"}>DOGEUSDT</MenuItem>
          <MenuItem value={"AVAXUSDT"}>AVAXUSDT</MenuItem>
          <MenuItem value={"TRXUSDT"}>TRXUSDT</MenuItem>
          <MenuItem value={"BCHUSDT"}>BCHUSDT</MenuItem>
          <MenuItem value={"LINKUSDT"}>LINKUSDT</MenuItem>
          <MenuItem value={"NEARUSDT"}>NEARUSDT</MenuItem>
          <MenuItem value={"MATICUSDT"}>MATICUSDT</MenuItem>
          <MenuItem value={"LTCUSDT"}>LTCUSDT</MenuItem>
          {/* Add more symbols as needed */}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterIndicators;
