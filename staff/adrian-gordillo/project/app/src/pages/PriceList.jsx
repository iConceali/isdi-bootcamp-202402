// app/src/pages/PriceList.jsx

import React from "react";
import { Box, Typography } from "@mui/material";
import PriceListTable from "../components/PriceList/PriceListTable";
import { usePriceList } from "../hooks/usePriceList";

const PriceList = () => {
  // Desestructura los valores devueltos por el hook personalizado usePriceList
  const { prices, orderDirection, orderBy, handleSort, handleToggleWatchlist } =
    usePriceList();
  // console.log(prices);
  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", p: 2 }}>
      <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
        Crypto Prices
      </Typography>
      <PriceListTable
        prices={prices}
        orderDirection={orderDirection}
        orderBy={orderBy}
        handleSort={handleSort}
        handleToggleWatchlist={handleToggleWatchlist}
      />
    </Box>
  );
};

export default PriceList;
