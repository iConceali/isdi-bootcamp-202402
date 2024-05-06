// app/src/components/NavBar/NavBar.jsx

import React, { useState } from "react";
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Menu,
  Toolbar,
  styled,
  Box,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../userContext";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

const StyledButton = styled(Button)({
  marginLeft: "1rem",
  padding: "0.5rem 1rem",
  borderRadius: "2rem",
  color: "white",
  fontWeight: "bold",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    backgroundImage: "linear-gradient(to bottom, #00efff, #006eff)",
  },
});

const NavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorElHome, setAnchorElHome] = useState(null);
  const openHome = Boolean(anchorElHome);
  const [anchorElOpp, setAnchorElOpp] = useState(null);
  const openOpp = Boolean(anchorElOpp);
  const location = useLocation();
  const { logoutUser, user } = useUser();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleHomeClick = (event) => {
    setAnchorElHome(event.currentTarget);
  };

  const handleHomeClose = () => {
    setAnchorElHome(null);
  };

  const handleOppClick = (event) => {
    setAnchorElOpp(event.currentTarget);
  };

  const handleOppClose = () => {
    setAnchorElOpp(null);
  };

  const scrollToSection = (sectionId) => {
    handleHomeClose();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        sx={{
          background: "#061121",
          boxShadow:
            "0 6px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={toggleDrawer}
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <StyledButton onClick={handleHomeClick}>Home</StyledButton>
            <Menu
              anchorEl={anchorElHome}
              open={openHome}
              onClose={handleHomeClose}
            >
              <MenuItem onClick={() => scrollToSection("home")}>Home</MenuItem>
              <MenuItem onClick={() => scrollToSection("value")}>
                Value
              </MenuItem>
              <MenuItem onClick={() => scrollToSection("tools")}>
                Tools
              </MenuItem>
              <MenuItem onClick={() => scrollToSection("about")}>
                About Us
              </MenuItem>
              <MenuItem onClick={() => scrollToSection("contact")}>
                Contact
              </MenuItem>
            </Menu>

            {user && (
              <>
                <StyledButton component={StyledLink} to="/prices">
                  Prices
                </StyledButton>
                <StyledButton component={StyledLink} to="/watchlist">
                  Watchlist
                </StyledButton>
                <StyledButton onClick={handleOppClick}>
                  Opportunities
                </StyledButton>
                <Menu
                  anchorEl={anchorElOpp}
                  open={openOpp}
                  onClose={handleOppClose}
                >
                  <MenuItem component={StyledLink} to="/opportunities">
                    Standard & Triangular
                  </MenuItem>
                  <MenuItem
                    component={StyledLink}
                    to="/technical-opportunities"
                  >
                    Technical Indicators
                  </MenuItem>
                </Menu>
                <StyledButton component={StyledLink} to="/trades">
                  Trades
                </StyledButton>
              </>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              width: "100%",
            }}
          >
            {user ? (
              <StyledButton sx={{ marginLeft: "auto" }} onClick={handleLogout}>
                Logout
              </StyledButton>
            ) : (
              <StyledButton
                sx={{ marginLeft: "auto" }}
                component={StyledLink}
                to="/login"
              >
                Login
              </StyledButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem button onClick={() => scrollToSection("home")}>
            Home
          </ListItem>
          {user && (
            <>
              <ListItem button component={StyledLink} to="/prices">
                Prices
              </ListItem>
              <ListItem button component={StyledLink} to="/watchlist">
                Watchlist
              </ListItem>
              <ListItem button onClick={handleOppClick}>
                Opportunities
              </ListItem>
              <Menu
                anchorEl={anchorElOpp}
                open={openOpp}
                onClose={handleOppClose}
              >
                <MenuItem component={StyledLink} to="/opportunities">
                  Standard & Triangular
                </MenuItem>
                <MenuItem component={StyledLink} to="/technical-opportunities">
                  Technical Indicators
                </MenuItem>
              </Menu>
              <ListItem button component={StyledLink} to="/trades">
                Trades
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </ThemeProvider>
  );
};

export default NavBar;
