import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../userContext";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";

const Login = () => {
  const [credentials, setCredentials] = useState({
    correoElectronico: "",
    contraseña: "",
  });
  const [error, setError] = useState(""); // Estado para almacenar el mensaje de error
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        credentials
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setUser({ nombre: response.data.nombre });
        navigate("/");
      }
    } catch (error) {
      setError("Correo electrónico o contraseña incorrectos"); // Configura el mensaje de error basado en la respuesta del servidor
      console.error(
        "Login failed:",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h5" sx={{ mt: 2, mb: 2, textAlign: "center" }}>
        Login
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Email"
          name="correoElectronico"
          value={credentials.correoElectronico}
          onChange={handleChange}
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Password"
          name="contraseña"
          type="password"
          value={credentials.contraseña}
          onChange={handleChange}
          required
        />
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <Box sx={{ mt: 2, mb: 2 }}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Login
          </Button>
          <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              No tienes una cuenta? Regístrate aquí
            </Link>
          </Typography>
        </Box>
      </form>
    </Container>
  );
};

export default Login;
