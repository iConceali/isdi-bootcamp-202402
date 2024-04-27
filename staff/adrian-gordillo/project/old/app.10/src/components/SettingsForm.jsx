// app/src/components/SettingsGorm.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, Grid, Card, Typography } from "@mui/material";

const SettingsForm = () => {
  const [capital, setCapital] = useState(1000); // Default capital
  const [profitThreshold, setProfitThreshold] = useState(0.1); // Default profit threshold

  const handleUpdateSettings = async () => {
    const config = {
      capital,
      umbralRentabilidad: profitThreshold,
    };
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/arbitrage/update`,
        config
      );
      console.log(data); // Log the updated opportunities
    } catch (error) {
      console.error("Failed to update settings:", error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Capital"
          type="number"
          value={capital}
          onChange={(e) => setCapital(Number(e.target.value))}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Profit Threshold (%)"
          type="number"
          value={profitThreshold}
          onChange={(e) => setProfitThreshold(Number(e.target.value))}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateSettings}
        >
          Update Settings
        </Button>
      </Grid>
    </Grid>
  );
};

export default SettingsForm;
