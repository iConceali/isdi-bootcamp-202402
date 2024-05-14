// src/components/AddOrderForm.jsx

import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { validate, errors } from "com";
const { ContentError } = errors;

const AddOrderForm = ({ onOrderAdded, closeForm }) => {
  const [formValues, setFormValues] = useState({
    symbol: "",
    date: "",
    investment: "",
    profitPercent: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      validate.text(formValues.symbol, "Symbol");
      validate.date(formValues.date, "Date");
      validate.number(parseFloat(formValues.investment), "Investment");
      validate.number(parseFloat(formValues.profitPercent), "Profit Percent");

      const orderData = {
        ...formValues,
        investment: parseFloat(formValues.investment),
        profitPercent: parseFloat(formValues.profitPercent),
      };

      await onOrderAdded(orderData);
      closeForm();
    } catch (error) {
      if (error instanceof ContentError) {
        console.error("Validation error:", error.message);
      } else {
        console.error("Failed to add order:", error);
      }
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
        p: 2,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h6" sx={{ mb: 1, textAlign: "center" }}>
        Add New Order
      </Typography>
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
        <option value="BNB/USDT">BNB/USDT</option>
        <option value="SOL/USDT">SOL/USDT</option>
        <option value="USDC/USDT">USDC/USDT</option>
        <option value="XRP/USDT">XRP/USDT</option>
        <option value="DOGE/USDT">DOGE/USDT</option>
        <option value="ADA/USDT">ADA/USDT</option>
        <option value="SHIB/USDT">SHIB/USDT</option>
        <option value="AVAX/USDT">AVAX/USDT</option>
        <option value="TRX/USDT">TRX/USDT</option>
        <option value="DOT/USDT">DOT/USDT</option>
        <option value="WBTC/USDT">WBTC/USDT</option>
        <option value="BCH/USDT">BCH/USDT</option>
        <option value="LINK/USDT">LINK/USDT</option>
        <option value="MATIC/USDT">MATIC/USDT</option>
        <option value="NEAR/USDT">NEAR/USDT</option>
        <option value="ICP/USDT">ICP/USDT</option>
        <option value="LTC/USDT">LTC/USDT</option>
        <option value="LEO/USDT">LEO/USDT</option>
      </TextField>
      <TextField
        label="Date"
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
        label="Investment"
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
      <Button variant="contained" type="submit" sx={{ mt: 2, height: "3rem" }}>
        Add Order
      </Button>
    </Box>
  );
};

export default AddOrderForm;
