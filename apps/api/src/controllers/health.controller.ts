import type { Request, Response } from "express";
import type { HealthResponse } from "@reservalab/shared";

export function getHealth(_req: Request, res: Response): void {
  const response: HealthResponse = {
    status: "ok",
    service: "reservalab-api",
    database: "not_configured",
    cache: "not_configured"
  };

  res.status(200).json(response);
}