// api/app.js

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { arbitrageRoutes, userRoutes } from "./routes/index.js";
import priceRoutes from "./routes/priceRoutes.js";
import EventEmitter from "events";
import { detectArbitrageAndNotify } from "./controllers/arbitrageController1.js"; // Asegúrate de importar correctamente
import { detectTriangular } from "./controllers/arbitrageController2.js"; // Asegúrate de importar correctamente

EventEmitter.defaultMaxListeners = 15;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "*", // Ajusta según tu política de CORS
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(
  cors({
    origin: process.env.APP_URL, // Revisa que esta URL sea correcta
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conexión exitosa a MongoDB");
    server.listen(process.env.PORT || 3000, () => {
      console.log(
        `Servidor corriendo en http://localhost:${process.env.PORT || 3000}`
      );

      // Inicia la búsqueda y registro de oportunidades cada 10 segundos
      setInterval(() => {
        console.log("Buscando nuevas oportunidades de arbitraje...");
        detectArbitrageAndNotify();
        detectTriangular();
      }, 10000); // 10 segundos
    });
  })
  .catch((error) => console.error("Error al conectar a MongoDB:", error));

io.on("connection", (socket) => {
  console.log("Un cliente se ha conectado");
  socket.on("disconnect", () => {
    console.log("Un cliente se ha desconectado");
  });
});

app.use("/api/users", userRoutes);
app.use("/api/arbitrage", arbitrageRoutes);
app.use("/api/prices", priceRoutes);

app.use((req, res, next) => {
  const error = new Error("Recurso no encontrado");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message || "An unknown error occurred.",
    },
  });
});

export { app, io };
