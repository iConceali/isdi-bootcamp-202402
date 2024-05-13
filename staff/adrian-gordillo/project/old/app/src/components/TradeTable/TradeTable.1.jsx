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
import axios from "axios";

const TradeTable = ({ trades, setTrades, updateParameters, parameters }) => {
  const isSmallScreen = window.innerWidth <= 442;

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        // Filtrar los trades para remover el eliminado
        const updatedTrades = trades.filter((trade) => trade._id !== id);
        setTrades(updatedTrades);

        updateParameters(updatedTrades, parameters.deposit);
      }
    } catch (error) {
      console.error("Failed to delete trade:", error);
    }
  };

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
                  onClick={() => handleDelete(trade._id)}
                  color="white"
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
