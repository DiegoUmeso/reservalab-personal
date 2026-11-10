import express from "express";
import { healthRouter } from "./routes/health.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import { spacesRouter } from "./routes/spaces.routes.js";
import {
  reservationsRouter
} from "./routes/reservations.routes.js";

export const app = express();

app.use(express.json());
app.use("/api/v1/reservations", reservationsRouter);
app.use("/api/v1", healthRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/spaces", spacesRouter);

app.use((_req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada"
  });
});