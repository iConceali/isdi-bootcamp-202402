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

const ParameterTable = ({ parameters, updateDeposit }) => {
  const [editDeposit, setEditDeposit] = useState(false);
  const [newDeposit, setNewDeposit] = useState(parameters.deposit);

  const handleEditDeposit = () => {
    setEditDeposit(true);
  };

  const handleSaveDeposit = () => {
    updateDeposit({ deposit: newDeposit }); // Asegúrate de enviar el objeto esperado por el backend
    setEditDeposit(false);
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
            <TableCell>
              {key === "deposit" && editDeposit ? (
                <TextField
                  type="number"
                  value={newDeposit}
                  onChange={handleDepositChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button onClick={handleSaveDeposit} color="primary">
                          Save
                        </Button>
                        <Button
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
                  {formatValue(key, value)}
                  {key === "deposit" && !editDeposit && (
                    <Button onClick={handleEditDeposit} color="primary">
                      Edit
                    </Button>
                  )}
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ParameterTable;
