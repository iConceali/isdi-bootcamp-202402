import EventEmitter from "events";
EventEmitter.defaultMaxListeners = 20;

export default function configureSockets(io) {
  io.on("connection", (socket) => {
    console.log("Un cliente se ha conectado");
    socket.on("disconnect", () => {
      console.log("Un cliente se ha desconectado");
    });
  });
}
