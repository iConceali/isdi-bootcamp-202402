// app/src/components/PriceList/PriceListTable.jsx

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
import PriceListRow from "./PriceListRow";

const PriceListTable = ({
  prices,
  orderDirection,
  orderBy,
  handleSort,
  handleToggleWatchlist,
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
        {prices.map((price, index) => (
          <PriceListRow
            key={price.symbol}
            price={price}
            index={index}
            handleToggleWatchlist={handleToggleWatchlist}
          />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default PriceListTable;
