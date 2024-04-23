// api/endpoints/app.js

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const arbitrageRoutes = require("./routes/arbitrageRoutes");
const app = express();

mongoose.connect("mongodb://localhost:27017/cryptoArbitrage", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/arbitrage-configs", arbitrageRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
