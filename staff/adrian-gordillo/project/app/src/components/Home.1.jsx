import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Link,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const HeroImage = "https://source.unsplash.com/random/1024x768?cryptocurrency"; // Change as needed
const StrategyImage = "https://source.unsplash.com/random/1024x768?blockchain"; // Change as needed

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Home = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box sx={{ my: 8, textAlign: "center" }}>
        <Typography
          variant={isMobile ? "h4" : "h1"}
          component="h1"
          gutterBottom
        >
          Discover the Power of Crypto Arbitrage
        </Typography>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Unleash potential with real-time arbitrage opportunities
        </Typography>
        <Button variant="contained" color="primary" size="large" sx={{ px: 5 }}>
          Get Started
        </Button>
        <Box
          component="img"
          src={HeroImage}
          alt="Crypto Arbitrage"
          sx={{ width: "100%", mt: 4, borderRadius: 2 }}
        />
      </Box>

      {/* Strategies Section */}
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Item>
            <Typography variant="h6" gutterBottom>
              Strategy Overview
            </Typography>
            <Typography>
              Dive deep into our advanced strategies that ensure the best
              arbitrage deals across multiple exchanges.
            </Typography>
            <Box
              component="img"
              src={StrategyImage}
              alt="Strategies"
              sx={{ width: "100%", mt: 2, borderRadius: 2 }}
            />
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <Typography variant="h6" gutterBottom>
              Automated Trading Bots
            </Typography>
            <Typography>
              Our bots work tirelessly to scan for price discrepancies and
              execute trades, maximizing your profit without manual
              intervention.
            </Typography>
          </Item>
        </Grid>
      </Grid>

      {/* Call to Action Section */}
      <Box sx={{ my: 8, textAlign: "center" }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Ready to Make a Move?
        </Typography>
        <Button variant="contained" color="secondary" size="large">
          Join Us Today
        </Button>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: "primary.dark", p: 6, mt: 10, color: "white" }}>
        <Typography variant="body1">
          GainGate &copy; {new Date().getFullYear()}
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
