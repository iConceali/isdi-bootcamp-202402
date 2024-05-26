// app/src/pages/Register.jsx

import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import useRegister from "../hooks/useRegister";

const Register = () => {
  const { userData, error, handleChange, handleSubmit } = useRegister();

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
          name="name"
          value={userData.name}
          onChange={handleChange}
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Email"
          name="email"
          value={userData.email}
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
          value={userData.password}
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
