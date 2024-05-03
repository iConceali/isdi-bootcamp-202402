// app/src/components/TradeTable/AddTradeForm.jsx

import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

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
        p: 2,
        bgcolor: "background.paper", // Define un color de fondo
        borderRadius: 2, // Bordes redondeados
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Aplica una sombra suave
      }}
    >
      <Typography variant="h6" sx={{ mb: 1, textAlign: "center" }}>
        Add New Trade
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
        <option value="DAI/USDT">DAI/USDT</option>
        <option value="UNI/USDT">UNI/USDT</option>
        <option value="ETC/USDT">ETC/USDT</option>
        <option value="CRO/USDT">CRO/USDT</option>
        <option value="FIL/USDT">FIL/USDT</option>
        <option value="XLM/USDT">XLM/USDT</option>
        <option value="STX/USDT">STX/USDT</option>
        <option value="OKB/USDT">OKB/USDT</option>
        <option value="RNDR/USDT">RNDR/USDT</option>
        <option value="VET/USDT">VET/USDT</option>
        <option value="MKR/USDT">MKR/USDT</option>
        <option value="GRT/USDT">GRT/USDT</option>
        <option value="AR/USDT">AR/USDT</option>
        <option value="XMR/USDT">XMR/USDT</option>
        <option value="ATOM/USDT">ATOM/USDT</option>
        <option value="THETA/USDT">THETA/USDT</option>
        <option value="FTM/USDT">FTM/USDT</option>
        <option value="LDO/USDT">LDO/USDT</option>
        <option value="FET/USDT">FET/USDT</option>
        <option value="RUNE/USDT">RUNE/USDT</option>
        <option value="INJ/USDT">INJ/USDT</option>
        <option value="HBAR/USDT">HBAR/USDT</option>
        <option value="ALGO/USDT">ALGO/USDT</option>
        <option value="FLOW/USDT">FLOW/USDT</option>
        <option value="GALA/USDT">GALA/USDT</option>
        <option value="AAVE/USDT">AAVE/USDT</option>
        <option value="QNT/USDT">QNT/USDT</option>
        <option value="BSV/USDT">BSV/USDT</option>
        <option value="NEO/USDT">NEO/USDT</option>
        <option value="PENDLE/USDT">PENDLE/USDT</option>
        <option value="AGIX/USDT">AGIX/USDT</option>
        <option value="AXS/USDT">AXS/USDT</option>
        <option value="CHZ/USDT">CHZ/USDT</option>
        <option value="SAND/USDT">SAND/USDT</option>
        <option value="AKT/USDT">AKT/USDT</option>
        <option value="EGLD/USDT">EGLD/USDT</option>
        <option value="KCS/USDT">KCS/USDT</option>
        <option value="XEC/USDT">XEC/USDT</option>
        <option value="XTZ/USDT">XTZ/USDT</option>
        <option value="EOS/USDT">EOS/USDT</option>
        <option value="MINA/USDT">MINA/USDT</option>
        <option value="HNT/USDT">HNT/USDT</option>
        <option value="CFX/USDT">CFX/USDT</option>
        <option value="MANA/USDT">MANA/USDT</option>
        <option value="GNO/USDT">GNO/USDT</option>
        <option value="GT/USDT">GT/USDT</option>
        <option value="AIOZ/USDT">AIOZ/USDT</option>
        <option value="KAVA/USDT">KAVA/USDT</option>
        <option value="CKB/USDT">CKB/USDT</option>
        <option value="IOTA/USDT">IOTA/USDT</option>
        <option value="NEXO/USDT">NEXO/USDT</option>
        <option value="CAKE/USDT">CAKE/USDT</option>
        <option value="TFUEL/USDT">TFUEL/USDT</option>
        <option value="KLAY/USDT">KLAY/USDT</option>
        <option value="SNX/USDT">SNX/USDT</option>
        <option value="ROSE/USDT">ROSE/USDT</option>
        <option value="RBN/USDT">RBN/USDT</option>
        <option value="WEMIX/USDT">WEMIX/USDT</option>
        <option value="WOO/USDT">WOO/USDT</option>
        <option value="IOTX/USDT">IOTX/USDT</option>
        <option value="CRV/USDT">CRV/USDT</option>
        <option value="TUSDT/USDT">TUSDT/USDT</option>
        <option value="OCEAN/USDT">OCEAN/USDT</option>
        <option value="FTT/USDT">FTT/USDT</option>
        <option value="ANKR/USDT">ANKR/USDT</option>
        <option value="DEXE/USDT">DEXE/USDT</option>
        <option value="COMP/USDT">COMP/USDT</option>
        <option value="TWT/USDT">TWT/USDT</option>
        <option value="SUPER/USDT">SUPER/USDT</option>
        <option value="GLM/USDT">GLM/USDT</option>
        <option value="1INCH/USDT">1INCH/USDT</option>
        <option value="NXM/USDT">NXM/USDT</option>
        <option value="CELO/USDT">CELO/USDT</option>
        <option value="RAY/USDT">RAY/USDT</option>
        <option value="ENJ/USDT">ENJ/USDT</option>
        <option value="LPT/USDT">LPT/USDT</option>
        <option value="HOT/USDT">HOT/USDT</option>
        <option value="ZIL/USDT">ZIL/USDT</option>
        <option value="RVN/USDT">RVN/USDT</option>
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
      <Button variant="contained" type="submit" sx={{ mt: 2, height: "3rem" }}>
        Add Order
      </Button>
    </Box>
  );
};

export default AddTradeForm;
