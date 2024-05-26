// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: `http://localhost:3000`, // Esto redirigirá las solicitudes de /api a tu servidor Express
  //       changeOrigin: true, // puede ser necesario dependiendo de la configuración del servidor
  //       secure: false, // puede ser necesario si estás desarrollando localmente y quieres evitar problemas de SSL
  //       rewrite: (path) => path.replace(/^\/api/, ""), // puede ser necesario para manejar correctamente las rutas
  //     },
  //   },
  // },
});
