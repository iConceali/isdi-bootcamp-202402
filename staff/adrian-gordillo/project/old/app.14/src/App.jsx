// app/src/App.jsx

import React, { useEffect } from "react";
import { createTheme, ThemeProvider, CssBaseline, Box } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { UserProvider, useUser } from "./userContext";
import NavBar from "./components/Navbar/NavBar";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PriceData from "./pages/PriceData";
import ArbitrageOpportunities from "./pages/ArbitrageOpportunities";
import TradeHistory from "./pages/TradeHistory";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";

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

function LayoutBox() {
  const location = useLocation();
  const isCenteredPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",

        color: "text.primary",
        overflow: "auto",
        width: "100%",
        alignItems: "center",
        justifyContent: isCenteredPage ? "center" : "flex-start",
        pt: isCenteredPage ? 0 : 8,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
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
          path="/watchlist"
          element={
            <ProtectedRoute>
              <Watchlist />
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
  );
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
      <CssBaseline />
      <UserProvider>
        <Router>
          <NavBar />
          <LayoutBox />
          <ToastContainer />
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
