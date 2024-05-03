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
          <TableCell>Inversión</TableCell>
          <TableCell>Profit %</TableCell>
          <TableCell>Profit $</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {trades.map((trade, index) => {
          // Convertir la fecha si es necesario
          const tradeDate = new Date(trade.date);
          const investment = trade.investment; // Asignar el valor de la inversión

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
              <TableCell>${parseFloat(investment).toFixed(2)}</TableCell>
              <TableCell>{trade.profitPercent.toFixed(2)}%</TableCell>
              {/* Calcular el Profit $ como el Profit % sobre la inversión */}
              <TableCell>
                $
                {(
                  (parseFloat(investment) * (trade.profitPercent || 0)) /
                  100
                ).toFixed(2)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TradeTable;
