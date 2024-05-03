// app/src/components/TradeTable/AddTradeForm.jsx

import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";

const AddTradeForm = ({ onTradeAdded, closeForm }) => {
  const [formValues, setFormValues] = useState({
    symbol: "",
    date: "",
    investment: "",
    profitPercent: "", // Nuevo campo para ingresar el Profit %
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      formValues.symbol &&
      formValues.date &&
      formValues.investment &&
      formValues.profitPercent // Asegúrate de que se esté pasando correctamente
    ) {
      const tradeData = {
        ...formValues,
        investment: parseFloat(formValues.investment), // Convertir a número
        profitPercent: parseFloat(formValues.profitPercent), // Convertir a número
      };

      try {
        onTradeAdded(tradeData);
      } catch (error) {
        console.error("Failed to add trade:", error);
      }
    } else {
      console.error("Please fill all fields correctly.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "20rem",
        m: "auto",
        mt: 4,
      }}
    >
      <TextField
        label=""
        name="symbol"
        value={formValues.symbol}
        onChange={handleInputChange}
        margin="normal"
        select
        SelectProps={{ native: true }}
      >
        <option value="">Select a pair</option>
        <option value="BTC/USDT">BTC/USDT</option>
        <option value="ETH/USDT">ETH/USDT</option>
        <option value="DOT/USDT">DOT/USDT</option>
        <option value="LTC/USDT">LTC/USDT</option>
      </TextField>
      <TextField
        label=""
        name="date"
        type="date"
        value={formValues.date}
        onChange={handleInputChange}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Inversión"
        name="investment"
        type="number"
        value={formValues.investment}
        onChange={handleInputChange}
        margin="normal"
      />
      <TextField
        label="Profit %"
        name="profitPercent"
        type="number"
        value={formValues.profitPercent}
        onChange={handleInputChange}
        margin="normal"
      />
      <Button type="submit" sx={{ mt: 2 }}>
        Add Order
      </Button>
    </Box>
  );
};

export default AddTradeForm;
