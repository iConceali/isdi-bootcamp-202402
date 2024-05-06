// app/src/pages/Register.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";

const Register = () => {
  const [userData, setUserData] = useState({
    nombre: "",
    correoElectronico: "",
    contraseña: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/register`,
        userData
      );
      navigate("/login");
    } catch (error) {
      // Actualiza aquí para usar el mensaje de error específico del backend
      const errorMsg =
        error.response?.data?.message || "Unexpected error occurred.";
      setError(errorMsg);
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
      <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Name"
          name="nombre"
          value={userData.nombre}
          onChange={handleChange}
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Email"
          name="correoElectronico"
          value={userData.correoElectronico}
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
          value={userData.contraseña}
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
            Register
          </Button>
          <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              ¿Ya tienes cuenta? Inicia sesión aquí
            </Link>
          </Typography>
        </Box>
      </form>
    </Container>
  );
};

export default Register;
