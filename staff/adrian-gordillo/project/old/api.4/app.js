// api/app.js

import dotenv from "dotenv";
dotenv.config();
import priceController from "./controllers/priceController"; // Asumiendo que actualizarás priceController a ES6
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { arbitrageRoutes, userRoutes } from "./routes"; // Asegúrate de que estos sean exportados correctamente
import priceRoutes from "./routes/priceRoutes";
import EventEmitter from "events";

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
    origin: "http://localhost:5173", // Asegúrate de permitir tu puerto de Vite
    methods: ["GET", "POST"],
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conexión exitosa a MongoDB"))
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

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export { app, io };
