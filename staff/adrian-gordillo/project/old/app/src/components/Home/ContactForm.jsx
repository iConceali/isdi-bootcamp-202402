// app/src/components/Home/ContactForm.jsx

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React from "react";

// Componente de formulario de contacto
const ContactForm = () => {
  return (
    <Container
      id="contact"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        "@media (max-width: 442px)": {
          padding: "5rem",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: "3rem",
          textAlign: "center",
          fontWeight: "bold",
          "#media (max-width: 442px)": {
            fontSize: "1.5rem",
          },
          marginBottom: "2rem",
        }}
      >
        Contact us
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "2rem",
          maxWidth: "30rem",
          width: "100%",
        }}
      >
        <TextField
          label="name"
          name="name"
          fullWidth
          required
          sx={{ marginBottom: "1rem" }}
          inputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "white" } }}
        />

        <TextField
          label="Email"
          name="email"
          fullWidth
          required
          sx={{ marginBottom: "1rem" }}
          inputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "white" } }}
        />

        <TextField
          label="Write a message..."
          name="message"
          fullWidth
          required
          rows={4}
          multiline
          sx={{ marginBottom: "1rem" }}
          inputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "white" } }}
        />
        <Button
          sx={{
            backgroundColor: "blue",
            color: "white",
            marginTop: "1rem",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
              backgroundImage: "linear-gradient(to bottom, #003eff, #006eff)",
            },
          }}
        >
          Submit!
        </Button>
      </Box>
    </Container>
  );
};

export default ContactForm;
