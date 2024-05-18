// app/src/pages/TradePage.jsx

import React, { useState, useEffect } from "react";
import { useUser } from "../userContext";
import TradeTable from "../components/TradeTable/TradeTable";
import ParameterTable from "../components/TradeTable/ParameterTable";
import AddTradeForm from "../components/TradeTable/AddTradeForm";
import { Box, Button, Modal } from "@mui/material";
import {
  fetchDeposit,
  fetchTrades,
  addTrade,
  updateDeposit,
} from "../logic/tradeLogic";

function TradePage() {
  const { user } = useUser();
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
    const loadData = async () => {
      if (user && user._id) {
        const token = sessionStorage.getItem("token");
        const deposit = await fetchDeposit(user._id, token);
        const trades = await fetchTrades(token);
        updateParameters(trades, deposit);
      }
    };

    loadData();
    const intervalId = setInterval(loadData, 10000);
    return () => clearInterval(intervalId);
  }, [user]);

  const updateParameters = (trades, deposit) => {
    const balance = trades.reduce(
      (acc, trade) => acc + trade.profitDollars,
      deposit
    );
    const profitDollars = balance - deposit;
    const winRate =
      (trades.filter((trade) => trade.profitDollars > 0).length /
        trades.length) *
      100;

    setParameters({
      deposit,
      balance: balance.toFixed(2),
      profitPercent: ((profitDollars / deposit) * 100).toFixed(2),
      profitDollars: profitDollars.toFixed(2),
      winRate: winRate.toFixed(2),
      numTrades: trades.length,
    });
  };

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  const handleAddTrade = async (tradeData) => {
    const token = sessionStorage.getItem("token");
    const newTrade = await addTrade(tradeData, token);
    const updatedTrades = [...trades, newTrade];
    setTrades(updatedTrades);
    updateParameters(updatedTrades, parameters.deposit);
    handleCloseForm();
  };

  const handleUpdateDeposit = async (newDeposit) => {
    const token = sessionStorage.getItem("token");
    await updateDeposit(user._id, { deposit: newDeposit }, token);
    updateParameters(trades, newDeposit);
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
      <TradeTable trades={trades} parameters={parameters} />
      <ParameterTable
        parameters={parameters}
        onUpdateDeposit={handleUpdateDeposit}
      />
      <Modal
        open={openForm}
        onClose={handleCloseForm}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
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
