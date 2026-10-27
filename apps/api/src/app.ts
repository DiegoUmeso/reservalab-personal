import express from "express";
import { healthRouter } from "./routes/health.routes.js";

export const app = express();

app.use(express.json());

app.use("/api/v1", healthRouter);

app.use((_req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada"
  });
});