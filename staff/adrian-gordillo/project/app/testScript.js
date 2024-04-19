import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  rejectUnauthorized: false, // Necesario si estás usando certificados SSL auto-firmados
});

socket.on("connect", () => {
  console.log("Conectado exitosamente a Socket.io");
});

socket.on("connect_error", (error) => {
  console.error("Error de conexión:", error);
});
