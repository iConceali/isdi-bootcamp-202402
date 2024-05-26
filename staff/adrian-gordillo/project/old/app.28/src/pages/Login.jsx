// app/src/pages/Login.jsx

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
import useLogin from "../hooks/useLogin";

const Login = () => {
  const { credentials, error, handleChange, handleSubmit } = useLogin();

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
