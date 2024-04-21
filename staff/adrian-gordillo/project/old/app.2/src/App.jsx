import React, { useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import { UserProvider, useUser } from "./userContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import PriceData from "./components/PriceData";
import ArbitrageOpportunities from "./components/ArbitrageOpportunities";
import TradeHistory from "./components/TradeHistory";
import NavBar from "./components/NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import { Box } from "@mui/material";

function ProtectedRoute({ children }) {
  const { user } = useUser();
  return user ? children : <Navigate to="/login" />;
}

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
    <UserProvider>
      <Router>
        <NavBar />
        <Box
          sx={{
            display: "flex",
            width: "100vw",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            padding: 3,
          }}
        >
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/prices"
              element={
                <ProtectedRoute>
                  <PriceData />
                </ProtectedRoute>
              }
            />
            <Route
              path="/opportunities"
              element={
                <ProtectedRoute>
                  <ArbitrageOpportunities notify={notifyUser} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <TradeHistory />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Box>
        <ToastContainer />
      </Router>
    </UserProvider>
  );
}

export default App;
