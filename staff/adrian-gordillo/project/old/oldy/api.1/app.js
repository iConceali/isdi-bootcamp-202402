// api/app.js

import express from "express";
import http from "http";
import { Server as SocketIO } from "socket.io";
import dotenv from "dotenv";
import mongoose from "mongoose";
import configureExpress from "./config/configureExpress.js";
import configureSockets from "./config/configureSockets.js";
import { setupScheduledTasks } from "./tasks/scheduledTasks.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST"],
  },
});

configureExpress(app);
configureSockets(io);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conexión exitosa a MongoDB");
    server.listen(process.env.PORT || 3000, () => {
      console.log(
        `Servidor corriendo en http://localhost:${process.env.PORT || 3000}`
      );
      setupScheduledTasks(); // Configurar tareas programadas después de que el servidor esté en ejecución
    });
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1);
  });

export { app, server, io };
