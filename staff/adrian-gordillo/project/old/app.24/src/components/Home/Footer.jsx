// app/src/components/Home/Footer.jsx

import { Box, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedinIcon from "@mui/icons-material/Linkedin";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <Box
        sx={{
          textAlign: "center",
          padding: "1rem",
          lineHeight: "3rem",
          backgroundImage:
            "linear-gradient(to bottom, rgba(6, 17, 33, 0.5), rgba(6, 17, 33, 1))",
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          Gain Gate
        </Typography>
        <Typography>
          &copy; {new Date().getFullYear()} Gain Gate. All rights reserved.
        </Typography>
        <Typography>C/ Diputació, 37, Barcelona, Spain</Typography>
        <Typography>+34 123 456 789</Typography>
        <Typography>gaingate@gmail.com</Typography>
        <Box sx={{ marginTop: "1rem" }}>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon
              sx={{
                color: "white",
                marginRight: "10px",
                transition: "color 0.3s ease",
                "&:hover": {
                  color: "rgb(0, 0, 255)",
                },
              }}
            />
          </a>

          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon
              sx={{
                color: "white",
                marginRight: "10px",
                transition: "color 0.3s ease",
                "&:hover": {
                  color: "rgb(0, 0, 255)",
                },
              }}
            />
          </a>

          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinIcon
              sx={{
                color: "white",
                marginRight: "10px",
                transition: "color 0.3s ease",
                "&:hover": {
                  color: "rgb(0, 0, 255)",
                },
              }}
            />
          </a>
        </Box>
        <Typography sx={{ fontStyle: "italic" }}>
          Powered by Adrian Gordillo
        </Typography>
      </Box>
    </footer>
  );
};

export default Footer;
