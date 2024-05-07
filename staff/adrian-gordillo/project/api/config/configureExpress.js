// config/configureExpress.js
import express from "express";
import cors from "cors";
import { arbitrageRoutes, userRoutes } from "../routes/index.js";
import priceRoutes from "../routes/cryptoPriceRoutes.js";
import tradeRoutes from "../routes/tradeRoutes.js";
import technicalIndicatorOpportunitiesRouter from "../routes/technicalIndicatorOpportunitiesRoutes.js";
import authenticate from "../middleware/auth.js";

export default function configureExpress(app) {
  app.use(express.json());
  app.use(
    cors({
      origin: process.env.APP_URL,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );

  // Rutas
  app.use("/api/users", userRoutes);
  app.use("/api/arbitrage", authenticate, arbitrageRoutes);
  app.use("/api/prices", authenticate, priceRoutes);
  app.use("/api/trades", authenticate, tradeRoutes);
  app.use(
    "/api/technical-indicator-opportunities",
    authenticate,
    technicalIndicatorOpportunitiesRouter
  );

  // Manejo de errores 404
  app.use((req, res, next) => {
    const error = new Error("Recurso no encontrado");
    error.status = 404;
    next(error);
  });

  // Manejo de otros errores
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message || "An unknown error occurred.",
      },
    });
  });
}
