// app/src/App.jsx

import React, { useEffect, useState } from "react";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
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
import TechnicalIndicatorsOpportunities from "./pages/TechnicalIndicatorsOpportunities";
import TradePage from "./pages/TradePage";

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

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <UserProvider>
        <Router>
          <AppContent />
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { logoutUser, isTokenExpired } = useUser();
  const [showSessionExpiredDialog, setShowSessionExpiredDialog] =
    useState(false);

  useEffect(() => {
    if (isTokenExpired) {
      setShowSessionExpiredDialog(true);
    }
  }, [isTokenExpired]);

  const handleCloseSessionExpiredDialog = () => {
    setShowSessionExpiredDialog(false);
    logoutUser();
  };

  return (
    <>
      <NavBar />
      <LayoutBox />
      <Dialog
        open={showSessionExpiredDialog}
        onClose={handleCloseSessionExpiredDialog}
      >
        <DialogTitle>Session Expired</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your session has expired. Please log in again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSessionExpiredDialog}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
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
          path="/orders"
          element={
            <ProtectedRoute>
              <TradePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/technical-opportunities"
          element={
            <ProtectedRoute>
              <TechnicalIndicatorsOpportunities />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Box>
  );
}

function ProtectedRoute({ children }) {
  const { isTokenExpired } = useUser();

  return !isTokenExpired ? children : <Navigate to="/login" />;
}

export default App;
