const io = require("socket.io-client");
let socket = io("https://localhost:3000", { secure: true });
socket.on("connect", () => {
  console.log("Conectado exitosamente a Socket.io");
});
