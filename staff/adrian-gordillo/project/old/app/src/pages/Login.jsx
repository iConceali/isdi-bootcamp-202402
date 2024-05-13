// app/src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../userContext"; // Asegúrate de que la ruta es correcta
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";

const Login = () => {
  const initialCredentialsState = {
    email: "",
    password: "",
  };

  const [credentials, setCredentials] = useState(initialCredentialsState);
  const [error, setError] = useState(""); // Estado para almacenar el mensaje de error
  const { loginUser } = useUser(); // Usar loginUser del contexto
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores anteriores
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/auth`,
        credentials
      );
      console.log("Respuesta del servidor:", response); // Ver la respuesta completa del servidor
      if (response.data.token) {
        loginUser(response.data.token); // Actualizar el contexto con todos los datos del usuario
        navigate("/");
      } else {
        setError("No se pudo iniciar sesión, por favor intente de nuevo.");
        navigate("/login");
      }
    } catch (error) {
      setError("Invalid email or password !");
      console.error(
        "Error en el inicio de sesión:",
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
          name="email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={credentials.password}
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
              ¿No tienes una cuenta? Regístrate aquí
            </Link>
          </Typography>
        </Box>
      </form>
    </Container>
  );
};

export default Login;
