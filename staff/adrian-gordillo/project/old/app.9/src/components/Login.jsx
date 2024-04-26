import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../userContext";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const Login = () => {
  const [credentials, setCredentials] = useState({
    correoElectronico: "",
    contraseña: "",
  });

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
      console.error(
        "Login failed:",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 30 }}>
      <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
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
        <Box sx={{ mt: 2, mb: 2 }}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Login
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Login;
