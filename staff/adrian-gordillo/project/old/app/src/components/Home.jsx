// app/src/components/Home.jsx

import React from "react";
import { Typography } from "@mui/material";
import { useUser } from "../userContext";

const Home = () => {
  const { user } = useUser();

  return (
    <div style={{ padding: 20 }}>
      <Typography
        variant="h4"
        sx={{
          maxWidth: 1200, // Asegúrate de que no sea demasiado ancha en pantallas grandes
          mx: "auto",
          mt: 50, // Reduce el margen superior para que la tabla esté más arriba
          p: 2,
        }}
      >
        Welcome to the Crypto Arbitrage Platform, {user ? user.nombre : "Guest"}
      </Typography>
    </div>
  );
};

export default Home;
