// app/src/components/TradeTable/ParameterRow.jsx

import React from "react";
import { TableRow, TableCell, Button } from "@mui/material";

const ParameterRow = ({
  parameterKey,
  value,
  handleEditDeposit,
  formatValue,
}) => {
  return (
    <TableRow>
      <TableCell>{parameterKey}</TableCell>
      <TableCell align="right">
        {parameterKey === "deposit" ? (
          <Button
            size="small"
            onClick={() => handleEditDeposit(parameterKey)}
            color="primary"
            sx={{ marginRight: 1 }}
          >
            Edit
          </Button>
        ) : null}
        {formatValue(parameterKey, value)}
      </TableCell>
    </TableRow>
  );
};

export default ParameterRow;
