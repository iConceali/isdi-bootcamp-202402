import React from "react";
import "../../src/index.css";
import { Box } from "@mui/material";

import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import Header from "../components/Header";
import ValueProposition from "../components/ValueProposition";
import Tools from "../components/Tools";
import AboutUs from "../components/AboutUs";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

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
