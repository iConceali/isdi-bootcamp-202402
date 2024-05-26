import axios from "axios";
import express from "express";
import fs from "fs";

const app = express();

app.get("/datos-binance", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=500"
    );
    const datos = response.data;

    // Guardar los datos en un archivo JSON
    fs.writeFileSync("datos-binance.json", JSON.stringify(datos, null, 2));

    res.json(datos);
  } catch (error) {
    console.error("Error al obtener los datos de la API de Binance:", error);
    res
      .status(500)
      .json({ error: "Error al obtener los datos de la API de Binance" });
  }
});

app.listen(3000, () => {
  console.log("Servidor backend escuchando en el puerto 3000");
});
