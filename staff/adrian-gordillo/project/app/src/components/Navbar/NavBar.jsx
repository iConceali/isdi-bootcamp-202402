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
  createTheme,
  styled,
  Box,
  ThemeProvider,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../userContext";
import "./navbar.css";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

const StyledButtons = styled(Button)({
  marginLeft: "1rem",
  padding: "0.5rem 1rem",
  borderRadius: "2rem",
  border: 0,
  color: "white",
  fontWeight: "bold",
  boxShadow: "none",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    backgroundImage: "linear-gradient(to bottom, #00efff, #006eff)",
  },
});

const NavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const location = useLocation();
  const { logoutUser, user } = useUser();
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const scrollToSection = (sectionId) => {
    handleClose();
    if (location.pathname === "/") {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
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
            sx={{ display: { xs: "block", sm: "none" } }} // Only shows on small screens
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <div className="nav-buttons">
              <StyledButtons onClick={handleClick}>Home</StyledButtons>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={() => scrollToSection("home")}>
                  Home
                </MenuItem>
                <MenuItem onClick={() => scrollToSection("value")}>
                  Value
                </MenuItem>
                <MenuItem onClick={() => scrollToSection("tools")}>
                  Tools
                </MenuItem>
                <MenuItem onClick={() => scrollToSection("about")}>
                  About us
                </MenuItem>
                <MenuItem onClick={() => scrollToSection("contact")}>
                  Contact
                </MenuItem>
              </Menu>

              {user && (
                <>
                  <StyledButtons component={StyledLink} to="/prices">
                    Prices
                  </StyledButtons>
                  <StyledButtons component={StyledLink} to="/opportunities">
                    Opportunities
                  </StyledButtons>
                  <StyledButtons component={StyledLink} to="/history">
                    History
                  </StyledButtons>
                  <StyledButtons
                    sx={{ marginLeft: "auto" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </StyledButtons>
                </>
              )}
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItem>
          {user && (
            <>
              <ListItem button component={Link} to="/prices">
                <ListItemText primary="Prices" />
              </ListItem>
              <ListItem button component={Link} to="/opportunities">
                <ListItemText primary="Opportunities" />
              </ListItem>
              <ListItem button component={Link} to="/history">
                <ListItemText primary="History" />
              </ListItem>
            </>
          )}
          <ListItem
            button
            onClick={handleLogout}
            style={{ display: user ? "block" : "none" }}
          >
            <ListItemText primary="Logout" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/login"
            style={{ display: !user ? "block" : "none" }}
          >
            <ListItemText primary="Login" />
          </ListItem>
        </List>
      </Drawer>
    </ThemeProvider>
  );
};

export default NavBar;
