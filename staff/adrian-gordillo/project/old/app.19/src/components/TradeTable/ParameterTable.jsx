// app/src/components/TradeTable/ParameterTable.jsx

import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";

const ParameterTable = ({
  parameters,
  trades,
  updateDeposit,
  updateParameters,
}) => {
  const [editDeposit, setEditDeposit] = useState(false);
  const [newDeposit, setNewDeposit] = useState(parameters.deposit);

  const handleEditDeposit = () => {
    setEditDeposit(true);
  };

  const handleSaveDeposit = () => {
    const depositValue = parseFloat(newDeposit); // Convertir a número si es necesario
    updateDeposit({ deposit: depositValue }); // Enviar objeto correctamente formateado
    setEditDeposit(false);
    updateParameters(trades, depositValue); // Asegúrate de pasar un número
  };

  const handleDepositChange = (event) => {
    setNewDeposit(event.target.value);
  };

  const formatValue = (key, value) => {
    if (key === "profitPercent" || key === "winRate") {
      return `${value}%`;
    }
    if (key === "deposit" || key === "balance" || key === "profitDollars") {
      return `$${value}`;
    }
    return value;
  };

  return (
    <Table sx={{ width: "100%", maxWidth: 360 }}>
      <TableHead>
        <TableRow>
          <TableCell>Parameter</TableCell>
          <TableCell align="right">Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(parameters).map(([key, value]) => (
          <TableRow key={key}>
            <TableCell>{key}</TableCell>
            <TableCell align="right">
              {key === "deposit" ? (
                editDeposit ? (
                  <TextField
                    size="small"
                    type="number"
                    value={newDeposit}
                    onChange={handleDepositChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            size="small"
                            onClick={handleSaveDeposit}
                            color="primary"
                          >
                            Save
                          </Button>
                          <Button
                            size="small"
                            onClick={() => setEditDeposit(false)}
                            color="secondary"
                          >
                            Cancel
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                  />
                ) : (
                  <>
                    <Button
                      size="small"
                      onClick={handleEditDeposit}
                      color="primary"
                      sx={{ marginRight: 1 }}
                    >
                      Edit
                    </Button>
                    {formatValue(key, value)}
                  </>
                )
              ) : (
                formatValue(key, value)
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ParameterTable;
