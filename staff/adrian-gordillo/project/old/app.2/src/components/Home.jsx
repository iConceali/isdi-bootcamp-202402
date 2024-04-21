// app/src/components/Home.jsx

import React from "react";
import { Typography } from "@mui/material";
import { useUser } from "../userContext";

const Home = () => {
  const { user } = useUser();

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4">
        Welcome to the Crypto Arbitrage Platform, {user ? user.nombre : "Guest"}
      </Typography>
    </div>
  );
};

export default Home;
