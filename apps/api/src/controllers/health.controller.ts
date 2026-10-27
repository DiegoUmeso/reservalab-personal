import type { Request, Response } from "express";

export function getHealth(_req: Request, res: Response): void {
  res.status(200).json({
    status: "ok",
    service: "reservalab-api",
    database: "not_configured",
    cache: "not_configured"
  });
}