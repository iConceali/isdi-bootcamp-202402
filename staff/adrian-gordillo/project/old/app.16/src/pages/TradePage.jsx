// app/src/pages/TradePage.jsx

import React, { useState, useEffect } from "react";
import TradeTable from "../components/TradeTable/TradeTable";
import ParameterTable from "../components/TradeTable/ParameterTable";
import AddTradeForm from "../components/TradeTable/AddTradeForm";
import { Box, Button, Modal, Typography } from "@mui/material";
import axios from "axios";
import { useUser } from "../userContext";

function TradePage() {
  const { user, token } = useUser();
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
    fetchDeposit().then((deposit) => {
      fetchTrades().then((trades) => {
        updateParameters(trades, deposit);
      });
    });
  }, []);

  const fetchDeposit = async () => {
    try {
      const apiUrl = `http://localhost:3000/api/users/deposit`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      const deposit = response.data.deposit;
      setParameters((prev) => ({ ...prev, deposit }));
      return deposit; // Retorna el valor del depósito
    } catch (error) {
      console.error("Failed to fetch deposit:", error);
      return 0; // Retorna 0 si hay un error
    }
  };

  const fetchTrades = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/trades");
      setTrades(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch trades:", error);
      return [];
    }
  };

  const updateParameters = (trades, deposit) => {
    deposit = Number(deposit); // Asegúrate de que el depósito es un número
    const balance = trades.reduce(
      (acc, trade) => acc + Number(trade.profitDollars),
      deposit
    );
    const roundedBalance = Number(balance.toFixed(2));

    const profitDollars = balance - deposit;
    const roundedprofitDollars = Number(profitDollars.toFixed(2));

    const winRate =
      (trades.filter((trade) => trade.profitDollars > 0).length /
        trades.length) *
      100;
    const numTrades = trades.length;
    const totalProfitPercent = trades.reduce(
      (acc, trade) => acc + Number(trade.profitPercent),
      0
    );

    setParameters({
      deposit,
      balance: roundedBalance,
      profitPercent: totalProfitPercent,
      profitDollars: roundedprofitDollars,
      winRate,
      numTrades,
    });
  };

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  const addTrade = async (tradeData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/trades",
        tradeData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setTrades([...trades, response.data]);
      updateParameters([...trades, response.data]);
      handleCloseForm();
    } catch (error) {
      console.error("Failed to add trade:", error);
    }
  };

  const updateDeposit = async (depositObject) => {
    try {
      const apiUrl = `http://localhost:3000/api/users/deposit`;
      const response = await axios.put(apiUrl, depositObject, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      console.log("Deposit updated:", response.data);
      setParameters((prevParameters) => ({
        ...prevParameters,
        deposit: depositObject.deposit,
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
      <Button variant="contained" onClick={handleOpenForm} sx={{ mb: 2 }}>
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
          <TradeTable trades={trades} />
        </Box>
        <Box sx={{ minWidth: 300, p: 1 }}>
          <ParameterTable
            parameters={parameters}
            trades={trades}
            updateDeposit={updateDeposit}
            updateParameters={updateParameters}
          />
        </Box>
      </Box>
      <Modal open={openForm} onClose={handleCloseForm}>
        <Box sx={{ bgcolor: "background.paper", p: 2, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add New Trade
          </Typography>
          <AddTradeForm onTradeAdded={addTrade} closeForm={handleCloseForm} />
        </Box>
      </Modal>
    </Box>
  );
}

export default TradePage;
