// app/src/App.jsx

import React, { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
import ArbitrageOpportunities1 from "./components/ArbitrageOpportunities1";
import ArbitrageOpportunities2 from "./components/ArbitrageOpportunities2"; // Importar el nuevo componente
import TradeHistory from "./components/TradeHistory";
import NavBar from "./components/NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import { Box } from "@mui/material";

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
    <ThemeProvider theme={darkTheme}>
      <UserProvider>
        <Router>
          <NavBar />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100vw",
              height: "100vh",
              justifyContent: "flex-start",
              alignItems: "center",
              padding: 3,
              bgcolor: "background.default",
              color: "text.primary",
              overflow: "auto",
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
                path="/opportunities1"
                element={
                  <ProtectedRoute>
                    <ArbitrageOpportunities1 notify={notifyUser} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/opportunities2"
                element={
                  <ProtectedRoute>
                    <ArbitrageOpportunities2 notify={notifyUser} />
                  </ProtectedRoute>
                }
              />{" "}
              {/* Add this line */}
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
