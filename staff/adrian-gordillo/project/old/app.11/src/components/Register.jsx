// app/src/components/Register.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const Register = () => {
  const [userData, setUserData] = useState({
    nombre: "",
    correoElectronico: "",
    contraseña: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/register`,
        userData
      );
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 30 }}>
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
        <Box sx={{ mt: 2, mb: 2 }}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Register
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Register;
