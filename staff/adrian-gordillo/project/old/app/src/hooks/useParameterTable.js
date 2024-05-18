// src/hooks/useParameterTable.js

import { useState, useEffect } from "react";

const useParameterTable = (parameters, handleUpdateDeposit) => {
  const [editDeposit, setEditDeposit] = useState(false);
  const [newDeposit, setNewDeposit] = useState(parameters.deposit || 0);

  useEffect(() => {
    setNewDeposit(parameters.deposit || 0);
  }, [parameters.deposit]);

  const handleEditDeposit = () => {
    setEditDeposit(true);
  };

  const handleSaveDeposit = () => {
    const depositValue = parseFloat(newDeposit);
    handleUpdateDeposit({ deposit: depositValue });
    setEditDeposit(false);
  };

  const handleDepositChange = (event) => {
    setNewDeposit(event.target.value);
  };

  const formatValue = (key, value) => {
    if (value === undefined || value === null) {
      return "N/A"; // O cualquier valor por defecto que prefieras
    }
    if (key === "profitPercent" || key === "winRate") {
      return `${value.toFixed(2)}%`;
    }
    if (key === "deposit" || key === "balance" || key === "profitDollars") {
      return `$${value.toFixed(2)}`;
    }
    return value;
  };

  return {
    editDeposit,
    newDeposit,
    handleEditDeposit,
    handleSaveDeposit,
    handleDepositChange,
    formatValue,
  };
};

export default useParameterTable;
