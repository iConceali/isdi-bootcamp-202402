// app/src/components/TradeTable/ParameterTable.jsx

import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const ParameterTable = ({ parameters }) => {
  const formatValue = (key, value) => {
    // Agregar el símbolo "%" si el parámetro es "profitPercent"
    if (key === "profitPercent") {
      return `${value}%`;
    }
    if (key === "winRate") {
      return `${value}%`;
    }
    // Agregar el símbolo "$" si el parámetro es "profitDollars"
    if (key === "profitDollars") {
      return `$${value}`;
    }
    if (key === "balance") {
      return `$${value}`;
    }
    if (key === "deposit") {
      return `$${value}`;
    }
    // Retornar el valor sin formato si no es "profitPercent" ni "profitDollars"
    return value;
  };

  return (
    <Table sx={{ width: "15rem" }}>
      <TableHead>
        <TableRow>
          <TableCell>Parameter</TableCell>
          <TableCell>Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(parameters).map(([key, value]) => (
          <TableRow key={key}>
            <TableCell>{key}</TableCell>
            <TableCell>{formatValue(key, value)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ParameterTable;
