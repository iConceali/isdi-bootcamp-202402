import { Box, Typography, Button } from "@mui/material";

const MainBanner = () => {
  return (
    <Box
      sx={{
        width: "100%",
        color: "common.white",
        textAlign: "center",
        paddingTop: "40px",
        paddingBottom: "24px",
        backgroundImage: "url(/path-to-background-image.jpg)",
        backgroundSize: "cover",
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Buy, Sell & Accept Digital Assets
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: "20px" }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </Typography>
      <Button variant="contained" sx={{ marginRight: "10px" }}>
        Get Started
      </Button>
      <Button variant="outlined">How it works</Button>
    </Box>
  );
};

export default MainBanner;
