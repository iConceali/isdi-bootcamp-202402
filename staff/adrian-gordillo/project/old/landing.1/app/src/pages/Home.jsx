import React from "react";
import { makeStyles } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline"; // Corregido
import Header from "../components/Header";
import PlaceToVisit from "../components/PlaceToVisit";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url("https://site.surveysparrow.com/wp-content/uploads/2023/05/1.png"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <PlaceToVisit />
    </div>
  );
}

export default Home;
