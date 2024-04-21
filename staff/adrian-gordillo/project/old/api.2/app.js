// api/app.js

require("dotenv").config();
const priceController = require("./controllers/priceController");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http"); // Usar el módulo HTTP
const { Server } = require("socket.io");
const { userRoutes, arbitrageRoutes } = require("./routes");
const priceRoutes = require("./routes/priceRoutes"); // Asegúrate de importar correctamente

require("events").EventEmitter.defaultMaxListeners = 15; // Aumentar el número a un límite más alto como 15 o más según sea necesario.

const app = express();

// Crear un servidor HTTP
const server = http.createServer(app); // Cambiado a HTTP

// Configuración de Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "*", // Ajusta según tu política de CORS
    methods: ["GET", "POST"],
  },
});

// Middlewares básicos
app.use(express.json());
// Configuración básica de CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Asegúrate de permitir tu puerto de Vite
    methods: ["GET", "POST"],
  })
);

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((error) => console.error("Error al conectar a MongoDB:", error));

// Manejo de eventos de Socket.io
io.on("connection", (socket) => {
  console.log("Un cliente se ha conectado");
  socket.on("disconnect", () => {
    console.log("Un cliente se ha desconectado");
  });
});

// Definición de rutas
app.use("/api/users", userRoutes);
app.use("/api/arbitrage-configs", arbitrageRoutes);
app.use("/api/prices", priceRoutes);
// app.use("/api", priceRoutes);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
  const error = new Error("Recurso no encontrado");
  error.status = 404;
  next(error);
});

// Middleware para manejar errores
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message || "An unknown error occurred.",
    },
  });
});

// Configuración del puerto y puesta en marcha del servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = { app, io };
