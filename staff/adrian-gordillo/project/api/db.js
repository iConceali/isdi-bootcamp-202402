// api/db.js

import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

// URL de conexión a la base de datos MongoDB
const dbURI = process.env.MONGO_URI;

// Configuración de la conexión a MongoDB
mongoose.connect(dbURI);

// Obtener la conexión a la base de datos
const db = mongoose.connection;

// Manejo de eventos de conexión
db.on("connected", () => {
  console.log(`Conexión exitosa a MongoDB en ${dbURI}`);
});

db.on("error", (error) => {
  console.error("Error de conexión a MongoDB:", error);
});

db.on("disconnected", () => {
  console.log("Desconectado de MongoDB");
});

// Captura de eventos SIGINT (señal de interrupción)
process.on("SIGINT", () => {
  // Cierra la conexión a la base de datos
  db.close(() => {
    // Muestra un mensaje indicando que la conexión ha sido cerrada
    console.log(
      "Conexión a MongoDB cerrada debido a la terminación de la aplicación"
    );
    // Termina el proceso con un código de salida 0 (sin errores)
    process.exit(0);
  });
});

export default db;
