// app/src/App.jsx

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PriceData from "./components/PriceData";
import ArbitrageOpportunities from "./components/ArbitrageOpportunities";
import TradeHistory from "./components/TradeHistory";
import NavBar from "./components/NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import { Box } from "@mui/material";

function App() {
  const notifyUser = (message) => {
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    const socket = io("http://localhost:3000", {
      transports: ["websocket"],
    });

    socket.on("arbitrageOpportunity", (data) => {
      notifyUser(data.message);
    });

    return () => {
      socket.off("arbitrageOpportunity");
      socket.close();
    };
  }, []);

  return (
    <Router>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          width: "100vw",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          padding: 3, // Añade padding para no pegar al borde
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prices" element={<PriceData />} />
          <Route
            path="/opportunities"
            element={<ArbitrageOpportunities notify={notifyUser} />}
          />
          <Route path="/history" element={<TradeHistory />} />
        </Routes>
      </Box>
      <ToastContainer />
    </Router>
  );
}

export default App;
