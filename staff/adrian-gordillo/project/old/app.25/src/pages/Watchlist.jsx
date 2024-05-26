// app/src/pages/Watchlist.jsx

import React from "react";
import { Box, Typography } from "@mui/material";
import WatchlistTable from "../components/Watchlist/WatchlistTable";
import { useWatchlist } from "../hooks/useWatchlist";

const Watchlist = () => {
  // Desestructura los valores devueltos por el hook personalizado useWatchlist
  const {
    watchlist,
    orderDirection,
    orderBy,
    handleSort,
    handleRemoveFromWatchlist,
  } = useWatchlist();

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", p: 2 }}>
      <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
        Your Watchlist
      </Typography>
      <WatchlistTable
        watchlist={watchlist}
        orderDirection={orderDirection}
        orderBy={orderBy}
        handleSort={handleSort}
        handleRemoveFromWatchlist={handleRemoveFromWatchlist}
      />
    </Box>
  );
};

export default Watchlist;
