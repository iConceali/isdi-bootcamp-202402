// app/src/components/Footer.jsx

import React from "react";
import { Box, Typography, Link } from "@mui/material";

function Footer() {
  return (
    <Box sx={{ py: 3, px: 2, mt: "auto", bgcolor: "background.default" }}>
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} Arbitraje Crypto. Todos los derechos
        reservados.
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        ¿Necesitas ayuda? Visita nuestro{" "}
        <Link href="#" color="inherit">
          Centro de Soporte
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;
