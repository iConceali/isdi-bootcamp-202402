// config/configureExpress.js
import express from "express";
import cors from "cors";
import {
  arbitrageRoutes,
  userRoutes,
  cryptoDataRoutes,
  ordersRoutes,
  technicalOpportunitiesRoutes,
} from "../routes/index.js";
import { errors, validate } from "com"; // Importar customErrors y validates

const { ContentError, NotFoundError, SystemError } = errors;

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

  // Validación y rutas
  try {
    validate.url(process.env.APP_URL, "App URL");

    app.use("/users", userRoutes);
    app.use("/arbitrage", arbitrageRoutes);
    app.use("/cryptoData", cryptoDataRoutes);
    app.use("/orders", ordersRoutes);
    app.use("/technical-opportunities", technicalOpportunitiesRoutes);
  } catch (error) {
    console.error("Validation error:", error.message);
    throw new ContentError("Invalid configuration: " + error.message);
  }

  // Manejo de errores 404
  app.use((req, res, next) => {
    const error = new NotFoundError("Resource not found");
    error.status = 404;
    next(error);
  });

  // Manejo de otros errores
  app.use((error, req, res, next) => {
    if (error instanceof ContentError || error instanceof NotFoundError) {
      res.status(error.status || 400).json({
        error: {
          message: error.message,
        },
      });
    } else {
      res.status(error.status || 500).json({
        error: {
          message: error.message || "An unknown error occurred.",
        },
      });
    }
  });
}
