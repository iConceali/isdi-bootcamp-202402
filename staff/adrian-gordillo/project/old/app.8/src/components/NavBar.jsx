import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <AppBar position="fixed" style={{ width: "100%" }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Crypto Arbitrage
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/prices">
          Prices
        </Button>
        <Button color="inherit" component={Link} to="/opportunities1">
          Opportunities
        </Button>
        <Button color="inherit" component={Link} to="/history">
          History
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
