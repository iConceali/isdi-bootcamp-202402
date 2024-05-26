// src/components/OrderTable.jsx

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

const OrderTable = ({ orders, onOrderDelete }) => {
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
            <TableCell>Order</TableCell>
            {!isSmallScreen && (
              <>
                <TableCell>Symbol</TableCell>
                <TableCell>Date</TableCell>
              </>
            )}
            <TableCell>Investment</TableCell>
            <TableCell>Profit %</TableCell>
            <TableCell>Profit $</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow key={order.id}>
              <TableCell>{index + 1}</TableCell>
              {!isSmallScreen && (
                <>
                  <TableCell>{order.symbol}</TableCell>
                  <TableCell>
                    {new Date(order.date).toLocaleDateString("es-ES")}
                  </TableCell>
                </>
              )}
              <TableCell>${parseFloat(order.investment).toFixed(2)}</TableCell>
              <TableCell>
                <span
                  className={`circle ${
                    order.profitPercent >= 0 ? "green" : "red"
                  }`}
                ></span>
                {order.profitPercent.toFixed(2)}%
              </TableCell>
              <TableCell>
                $
                {(
                  (parseFloat(order.investment) * (order.profitPercent || 0)) /
                  100
                ).toFixed(2)}
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => onOrderDelete(order.id)}
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

export default OrderTable;
