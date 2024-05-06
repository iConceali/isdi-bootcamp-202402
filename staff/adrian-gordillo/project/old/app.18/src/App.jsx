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
  const { user, logoutUser } = useUser();
  const [showSessionExpiredDialog, setShowSessionExpiredDialog] =
    useState(false);

  useEffect(() => {
    const checkTokenExpiration = () => {
      // Esta función debería comprobar si el token ha expirado realmente
      // Supongamos que `user` tiene una marca de tiempo que indica cuándo expira el token
      if (user && new Date().getTime() > user.tokenExpiration) {
        setShowSessionExpiredDialog(true);
      }
    };

    checkTokenExpiration();

    const intervalId = setInterval(checkTokenExpiration, 60000); // Comprueba cada minuto

    return () => {
      clearInterval(intervalId);
    };
  }, [user]);

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
          path="/trades"
          element={
            <ProtectedRoute>
              <TradePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Box>
  );
}

function ProtectedRoute({ children }) {
  const { user } = useUser();
  return user ? children : <Navigate to="/login" />;
}

export default App;
