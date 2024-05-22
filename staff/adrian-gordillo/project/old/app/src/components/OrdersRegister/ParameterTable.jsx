// src/components/OrdersRegister/ParameterTable.jsx

import React from "react";
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
import useParameterTable from "../../hooks/useParameterTable";

const ParameterTable = ({ parameters, handleUpdateDeposit }) => {
  const {
    editDeposit,
    newDeposit,
    handleEditDeposit,
    handleSaveDeposit,
    handleDepositChange,
    formatValue,
  } = useParameterTable(parameters, handleUpdateDeposit);

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
                    {formatValue(key, value)}
                    <Button
                      size="small"
                      onClick={handleEditDeposit}
                      color="primary"
                      sx={{ marginLeft: 1 }}
                    >
                      Edit
                    </Button>
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
