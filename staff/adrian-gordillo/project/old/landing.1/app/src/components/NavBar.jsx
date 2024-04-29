// app/src/components/NavBar.jsx

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  useScrollTrigger,
} from "@mui/material";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

function NavBar() {
  return (
    <ElevationScroll>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Arbitraje de Criptomonedas
          </Typography>
          <Button color="inherit">Inicio</Button>
          <Button color="inherit">Sobre Nosotros</Button>
          <Button color="inherit">Funcionalidades</Button>
          <Button color="inherit">Contacto</Button>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
}

export default NavBar;
