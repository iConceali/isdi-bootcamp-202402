// api/db.js

const mongoose = require("mongoose");

// URL de conexión a la base de datos MongoDB
const dbURI = "mongodb://localhost:27017/tradingdb";

// Configuración de la conexión a MongoDB
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
  db.close(() => {
    console.log(
      "Conexión a MongoDB cerrada debido a la terminación de la aplicación"
    );
    process.exit(0);
  });
});

module.exports = db;
