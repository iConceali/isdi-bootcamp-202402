// app/src/components/TradeTable/TradeTable.jsx

import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const TradeTable = ({ trades }) => {
  const isSmallScreen = window.innerWidth <= 442;

  return (
    <Table
      sx={{ width: isSmallScreen ? "20rem" : "70rem", maxHeight: "40rem" }}
    >
      <TableHead>
        <TableRow>
          <TableCell>Trade</TableCell>
          {!isSmallScreen && (
            <>
              <TableCell>Symbol</TableCell>
              <TableCell>Date</TableCell>
            </>
          )}
          <TableCell>Buy Price</TableCell>
          <TableCell>Sell Price</TableCell>
          <TableCell>Profit %</TableCell>
          <TableCell>Profit $</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {trades.map((trade, index) => {
          // Convertir la fecha si es necesario
          const tradeDate = new Date(trade.date);
          return (
            <TableRow key={trade._id}>
              {/* Usar trade.id como clave */}
              <TableCell>{index + 1}</TableCell>
              {!isSmallScreen && (
                <>
                  <TableCell>{trade.symbol}</TableCell>
                  <TableCell>{tradeDate.toLocaleDateString("es-ES")}</TableCell>
                </>
              )}
              <TableCell>${trade.buyPrice.toFixed(2)}</TableCell>
              <TableCell>${trade.sellPrice.toFixed(2)}</TableCell>
              <TableCell>{trade.profitPercent.toFixed(2)}%</TableCell>
              <TableCell>${trade.profitDollars.toFixed(2)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TradeTable;
