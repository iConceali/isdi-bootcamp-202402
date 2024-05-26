// app/src/components/PriceList/PriceListRow.jsx

import React from "react";
import { TableCell, TableRow, IconButton, Box, Avatar } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const getIconUrl = (symbol) =>
  `../public/crypto-icon/${symbol.toLowerCase()}.png`;

const PriceListRow = ({ price, index, handleToggleWatchlist }) => (
  <TableRow key={price.symbol}>
    <TableCell>
      <IconButton
        onClick={() => handleToggleWatchlist(price.id, price.isInWatchlist)}
      >
        {price.isInWatchlist ? (
          <StarIcon sx={{ color: "yellow" }} />
        ) : (
          <StarBorderIcon />
        )}
      </IconButton>
    </TableCell>
    <TableCell>{index + 1}</TableCell>
    <TableCell>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar
          src={getIconUrl(price.symbol)}
          alt={price.symbol}
          sx={{ width: 24, height: 24 }}
        />
        {price.symbol.toUpperCase()}
      </Box>
    </TableCell>
    <TableCell>${price.price ? price.price.toFixed(2) : "N/A"}</TableCell>
    <TableCell
      sx={{
        color: price.price24Hr >= 0 ? "green" : "red",
        animation: "blinking 2s infinite",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {price.price24Hr >= 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        {`${Math.abs(price.price24Hr).toFixed(2)}%`}
      </Box>
    </TableCell>
    <TableCell>${parseFloat(price.marketCap).toLocaleString()}</TableCell>
  </TableRow>
);

export default PriceListRow;
