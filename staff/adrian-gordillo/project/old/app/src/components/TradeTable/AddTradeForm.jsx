// app/src/components/TradeTable/AddTradeForm.jsx

import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";

const AddTradeForm = ({ onTradeAdded, closeForm }) => {
  const [formValues, setFormValues] = useState({
    symbol: "",
    date: "",
    buyPrice: "",
    sellPrice: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const calculateProfitPercent = () => {
    const buyPrice = parseFloat(formValues.buyPrice);
    const sellPrice = parseFloat(formValues.sellPrice);

    // Validar que los precios de compra y venta sean números válidos y no cero
    if (!isNaN(buyPrice) && !isNaN(sellPrice) && buyPrice !== 0) {
      return ((sellPrice - buyPrice) / buyPrice) * 100;
    } else {
      return 0; // Devolver 0 si no se pueden calcular correctamente
    }
  };

  const calculateProfitDollars = () => {
    const buyPrice = parseFloat(formValues.buyPrice);
    const sellPrice = parseFloat(formValues.sellPrice);
    return sellPrice - buyPrice;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      formValues.symbol &&
      formValues.date &&
      formValues.buyPrice &&
      formValues.sellPrice
    ) {
      const tradeData = {
        ...formValues,
        buyPrice: parseFloat(formValues.buyPrice),
        sellPrice: parseFloat(formValues.sellPrice),
        profitPercent: calculateProfitPercent(),
        profitDollars: calculateProfitDollars(),
      };

      try {
        onTradeAdded(tradeData); // Utiliza la función onTradeAdded pasada como prop para enviar los datos del trade
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
        label="Buy price"
        name="buyPrice"
        type="number"
        value={formValues.buyPrice}
        onChange={handleInputChange}
        margin="normal"
      />
      <TextField
        label="Sell price"
        name="sellPrice"
        type="number"
        value={formValues.sellPrice}
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
