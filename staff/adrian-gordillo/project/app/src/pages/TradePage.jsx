// app/src/pages/TradePage.jsx

// Importar useState y useEffect
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
    fetchTrades();
    fetchDeposit();
  }, []);

  const fetchDeposit = async () => {
    try {
      const apiUrl = `http://localhost:3000/api/users/deposit`;
      console.log("API URL:", apiUrl);

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      console.log("Deposit:", response.data.deposit);

      // Actualizar el estado local de parameters con el valor del depósito del usuario
      setParameters((prevParameters) => ({
        ...prevParameters,
        deposit: response.data.deposit,
      }));
    } catch (error) {
      console.error("Failed to fetch deposit:", error);
    }
  };

  const fetchTrades = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/trades");
      setTrades(response.data);
      updateParameters(response.data);
    } catch (error) {
      console.error("Failed to fetch trades:", error);
    }
  };

  const updateParameters = (trades) => {
    const deposit = parameters.deposit;
    const balance = trades.reduce(
      (acc, trade) => acc + trade.profitDollars,
      parameters.deposit
    );
    const profitDollars = balance - deposit;
    const winRate =
      (trades.filter((trade) => trade.profitDollars > 0).length /
        trades.length) *
      100;
    const numTrades = trades.length;

    // Calcular el porcentaje de beneficio sumando todos los porcentajes de beneficio de las operaciones
    const totalProfitPercent = trades.reduce(
      (acc, trade) => acc + trade.profitPercent,
      0
    );

    setParameters({
      deposit,
      balance,
      profitPercent: totalProfitPercent,
      profitDollars,
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

  const updateDeposit = async (newDeposit) => {
    try {
      if (!user || !user._id) {
        console.error("User ID not found");
        return;
      }
      // console.log("User ID:", user._id);
      // const userId = user._id;
      const apiUrl = `http://localhost:3000/api/users/deposit`;
      console.log("API URL:", apiUrl);

      const response = await axios.put(
        apiUrl,
        { deposit: newDeposit },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      console.log("Deposit updated:", response.data);

      // Actualizar el estado local de parameters con el nuevo depósito
      setParameters((prevParameters) => ({
        ...prevParameters,
        deposit: newDeposit,
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
            updateDeposit={updateDeposit}
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
