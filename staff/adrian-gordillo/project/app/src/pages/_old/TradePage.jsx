// app/src/pages/TradePage.jsx

import React, { useState, useEffect } from "react";
import { Box, Button, Modal } from "@mui/material";
import TradeTable from "../components/TradeTable/TradeTable";
import ParameterTable from "../components/TradeTable/ParameterTable";
import AddTradeForm from "../components/TradeTable/AddTradeForm";
import { useUser } from "../userContext";
import getLoggedInUserId from "../logic/getLoggedInUserId"; // Importa la función
import {
  fetchDeposit,
  fetchTrades,
  addTrade,
  updateDeposit,
} from "../logic/tradeService";
import { updateParameters } from "../logic/tradeLogic";
import { deleteTrade } from "../logic/tradeApiService";

function TradePage() {
  const { token } = useUser(); // Obtenemos solo el token directamente
  const userId = getLoggedInUserId(); // Obtiene el userId desde el token
  const [trades, setTrades] = useState([]);
  const [parameters, setParameters] = useState({
    deposit: 0,
    balance: 0,
    profitPercent: 0,
    profitDollars: 0,
    winRate: 0,
    numTrades: 0,
  });
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    if (token && userId) {
      // Aseguramos que tenemos token y userId antes de llamar datos
      loadInitialData();
    }
  }, [token, userId]);

  const loadInitialData = async () => {
    try {
      const deposit = await fetchDeposit(token);
      const tradesData = await fetchTrades();
      const updatedParameters = updateParameters(tradesData, deposit);
      setTrades(tradesData);
      setParameters(updatedParameters);
    } catch (error) {
      console.error("Failed to load initial data:", error);
    }
  };

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  const handleAddTrade = async (tradeData) => {
    try {
      const newTrade = await addTrade(tradeData, token);
      const updatedTrades = [...trades, newTrade];
      setTrades(updatedTrades);
      const updatedParameters = updateParameters(
        updatedTrades,
        parameters.deposit
      );
      setParameters(updatedParameters);
      handleCloseForm();
    } catch (error) {
      console.error("Failed to add trade:", error);
    }
  };

  const handleUpdateDeposit = async (depositObject) => {
    try {
      const updatedDepositInfo = await updateDeposit(depositObject, token);
      setParameters((prevParameters) => ({
        ...prevParameters,
        deposit: updatedDepositInfo.deposit,
      }));
    } catch (error) {
      console.error("Failed to update deposit:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
        p: 1,
      }}
    >
      <Button
        variant="contained"
        onClick={handleOpenForm}
        sx={{ mb: 2, mr: "auto" }}
      >
        + Add Order
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <Box sx={{ minWidth: "60%", p: 1 }}>
          <TradeTable
            parameters={parameters}
            trades={trades}
            onTradeDelete={(id) =>
              deleteTrade(
                id,
                token,
                trades,
                setTrades,
                updateParameters,
                parameters
              )
            }
          />
        </Box>
        <Box sx={{ minWidth: 300, p: 1, ml: 2 }}>
          <ParameterTable
            parameters={parameters}
            trades={trades}
            updateDeposit={handleUpdateDeposit} // Asegúrate de que esto corresponde a una función
            updateParameters={updateParameters} // Propagando la función correctamente
          />
        </Box>
      </Box>
      <Modal
        open={openForm}
        onClose={handleCloseForm}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box>
          <AddTradeForm
            onTradeAdded={handleAddTrade}
            closeForm={handleCloseForm}
          />
        </Box>
      </Modal>
    </Box>
  );
}

export default TradePage;
