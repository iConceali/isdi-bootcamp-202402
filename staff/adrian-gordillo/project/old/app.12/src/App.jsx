// app/src/App.jsx

import React, { useEffect } from "react";
import { createTheme, ThemeProvider, Grid, Box } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UserProvider, useUser } from "./userContext";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import PriceData from "./components/PriceData";
import ArbitrageOpportunities from "./components/ArbitrageOpportunities";
import TradeHistory from "./components/TradeHistory";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";

// Configuración del tema oscuro
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2793F2",
    },
    secondary: {
      main: "#F20CB5",
    },
    background: {
      default: "#131215",
      paper: "#272A2F",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

function ProtectedRoute({ children }) {
  const { user } = useUser();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_API_URL}`, {
      transports: ["websocket"],
    });

    socket.on("arbitrageOpportunity", (data) => {
      toast(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });

    return () => {
      socket.off("arbitrageOpportunity");
      socket.close();
    };
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <UserProvider>
        <Router>
          <NavBar />
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
              bgcolor: "background.default", // Asegura que se usa el color de fondo del tema
              color: "text.primary", // Asegura que se usa el color de texto del tema
              overflow: "auto",
            }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
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
                    <ArbitrageOpportunities />
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
    </ThemeProvider>
  );
}

export default App;
