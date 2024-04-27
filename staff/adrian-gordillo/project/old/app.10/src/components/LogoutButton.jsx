// app/src/components/LogoutButton.jsx

import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../userContext";

const LogoutButton = () => {
  const { logoutUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <Button onClick={handleLogout} color="inherit">
      Logout
    </Button>
  );
};

export default LogoutButton;
