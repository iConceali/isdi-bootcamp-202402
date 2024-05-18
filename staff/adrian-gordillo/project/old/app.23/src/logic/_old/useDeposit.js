// app/src/logic/useDeposit.js

import { useState } from "react";

export const useDeposit = (
  initialDeposit,
  updateDeposit,
  updateParameters,
  trades
) => {
  const [editDeposit, setEditDeposit] = useState(false);
  const [newDeposit, setNewDeposit] = useState(initialDeposit);

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

  return {
    editDeposit,
    newDeposit,
    handleEditDeposit,
    handleSaveDeposit,
    handleDepositChange,
    setEditDeposit,
  };
};
