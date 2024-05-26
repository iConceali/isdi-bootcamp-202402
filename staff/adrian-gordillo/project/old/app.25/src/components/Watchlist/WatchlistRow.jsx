// app/src/components/Watchlist/WatchlistRow.jsx

import React from "react";
import { TableCell, TableRow, IconButton, Box, Avatar } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const WatchlistRow = ({ crypto, index, handleRemoveFromWatchlist }) => (
  <TableRow key={crypto._id}>
    <TableCell>
      <IconButton onClick={() => handleRemoveFromWatchlist(crypto._id)}>
        <StarIcon sx={{ color: "gold" }} />
      </IconButton>
    </TableCell>
    <TableCell>{index + 1}</TableCell>
    <TableCell>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar
          src={`../public/crypto-icon/${crypto.symbol.toLowerCase()}.png`}
          alt={crypto.symbol}
          sx={{ width: 24, height: 24 }}
        />
        {crypto.symbol.toUpperCase()}
      </Box>
    </TableCell>
    <TableCell>${crypto.price.toFixed(2)}</TableCell>
    <TableCell
      sx={{
        color: crypto.price24Hr >= 0 ? "green" : "red",
        animation: "blinking 2s infinite",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {crypto.price24Hr >= 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        {`${crypto.price24Hr.toFixed(2)}%`}
      </Box>
    </TableCell>
    <TableCell>
      {crypto.marketCap
        ? parseFloat(crypto.marketCap).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })
        : "N/A"}
    </TableCell>
  </TableRow>
);

export default WatchlistRow;
