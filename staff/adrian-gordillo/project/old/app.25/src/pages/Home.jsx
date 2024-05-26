// app/src/pages/Home.jsx

import React from "react";
import "../../src/index.css";
import { Box } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import Header from "../components/Home/Header";
import ValueProposition from "../components/Home/ValueProposition";
import Tools from "../components/Home/Tools";
import AboutUs from "../components/Home/AboutUs";
import ContactForm from "../components/Home/ContactForm";
import Footer from "../components/Home/Footer";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
  },
});

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Header />
        <ValueProposition />
        <Tools />
        <AboutUs />
        <ContactForm />
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Home;
