// app/src/components/TradeTable/TradeTable.jsx

import React from "react";
import {
  Table,
  Box,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TradeTable = ({ trades, onTradeDelete }) => {
  const isSmallScreen = window.innerWidth <= 442;

  return (
    <Box
      sx={{
        maxHeight: "40rem",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        width: isSmallScreen ? "100%" : "70rem",
      }}
    >
      <Table sx={{ width: "100%" }}>
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
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trades.map((trade, index) => (
            <TableRow key={trade._id}>
              <TableCell>{index + 1}</TableCell>
              {!isSmallScreen && (
                <>
                  <TableCell>{trade.symbol}</TableCell>
                  <TableCell>
                    {new Date(trade.date).toLocaleDateString("es-ES")}
                  </TableCell>
                </>
              )}
              <TableCell>${parseFloat(trade.investment).toFixed(2)}</TableCell>
              <TableCell>
                <span
                  className={`circle ${
                    trade.profitPercent >= 0 ? "green" : "red"
                  }`}
                ></span>
                {trade.profitPercent.toFixed(2)}%
              </TableCell>
              <TableCell>
                $
                {(
                  (parseFloat(trade.investment) * (trade.profitPercent || 0)) /
                  100
                ).toFixed(2)}
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => onTradeDelete(trade._id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default TradeTable;
