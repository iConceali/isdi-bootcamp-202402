import { Box, Typography } from "@mui/material";
import React from "react";

const AboutUs = () => {
  return (
    <Box id="about">
      <Typography
        sx={{
          fontSize: "3rem",
          textAlign: "center",
          fontWeight: "bold",
          padding: "0.5rem 1rem",
          "#media (max-width: 442px)": {
            fontSize: "1.5rem",
          },
          marginBottom: "4rem",
          marginTop: "4rem",
        }}
      >
        About us!
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
          textAlign: "center",
          gap: "3rem",
          marginBottom: "2rem",
          backgroundColor: "#1A2239",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        <Box
          sx={{
            width: "35rem",
            borderRadius: "10px",
            padding: "1,5rem",
            "@media (max-width: 442px)": {
              padding: "5rem",
            },
          }}
        >
          <Typography
            sx={{ fontWeight: "bold", marginBottom: "1rem", fontSize: "2rem" }}
          >
            About the Project
          </Typography>
          <Typography>
            This cryptocurrency arbitration project is the culmination of my
            training as a Fullstack web developer at Isdi Coders. Designed to
            automate and optimize cryptocurrency trading, it reflects the skills
            and knowledge acquired during the bootcamp.
          </Typography>
        </Box>

        <Box
          sx={{
            width: "35rem",
            borderRadius: "10px",
            padding: "1,5rem",
            "@media (max-width: 442px)": {
              padding: "5rem",
            },
          }}
        >
          <Typography
            sx={{ fontWeight: "bold", marginBottom: "1rem", fontSize: "2rem" }}
          >
            About the Developer
          </Typography>
          <Typography>
            My name is Adrián Gordillo, a passionate web developer and
            blockchain enthusiast based in Barcelona. This project not only
            marks a milestone in my educational career but also symbolizes my
            entry into the professional world of software development.
          </Typography>
        </Box>

        <Box
          sx={{
            width: "35rem",
            borderRadius: "10px",
            padding: "1,5rem",
            "@media (max-width: 442px)": {
              padding: "5rem",
            },
          }}
        >
          <Typography
            sx={{ fontWeight: "bold", marginBottom: "1rem", fontSize: "2rem" }}
          >
            Vision and Mission
          </Typography>
          <Typography>
            My goal in developing this tool is to facilitate more efficient and
            profitable arbitrage operations, democratizing access to advanced
            trading strategies for investors of all levels. I aspire to continue
            developing solutions that merge technology and finance, contributing
            to the evolution of the fintech sector.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutUs;
