// app/src/components/Watchlist/WatchlistTable.jsx

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  TableSortLabel,
} from "@mui/material";
import WatchlistRow from "./WatchlistRow";

const WatchlistTable = ({
  watchlist,
  orderDirection,
  orderBy,
  handleSort,
  handleRemoveFromWatchlist,
}) => (
  <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: "10px" }}>
    <Table sx={{ backgroundColor: "#272A2F" }} aria-label="crypto prices table">
      <TableHead>
        <TableRow>
          <TableCell sx={{ width: "1rem" }}></TableCell>
          <TableCell sx={{ width: "1rem" }}>#</TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === "symbol"}
              direction={orderDirection}
              onClick={() => handleSort("symbol")}
            >
              Symbol
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === "price"}
              direction={orderDirection}
              onClick={() => handleSort("price")}
            >
              Price
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === "price24Hr"}
              direction={orderDirection}
              onClick={() => handleSort("price24Hr")}
            >
              24h%
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === "marketCap"}
              direction={orderDirection}
              onClick={() => handleSort("marketCap")}
            >
              Market Cap
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {watchlist.map((crypto, index) => (
          <WatchlistRow
            key={crypto._id}
            crypto={crypto}
            index={index}
            handleRemoveFromWatchlist={handleRemoveFromWatchlist}
          />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default WatchlistTable;
