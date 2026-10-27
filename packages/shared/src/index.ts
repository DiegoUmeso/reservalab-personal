import { z } from "zod";

export const roleSchema = z.enum([
  "administrador",
  "docente",
  "estudiante"
]);

export const registerSchema = z.strictObject({
  name: z.string().trim().min(2).max(100),
  email: z.email().max(254),
  password: z.string().min(8).max(128)
});

export const loginSchema = z.strictObject({
  email: z.email().max(254),
  password: z.string().min(1).max(128)
});

export type Role = z.infer<typeof roleSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export interface HealthResponse {
  status: "ok" | "error";
  service: "reservalab-api";
  database: "not_configured" | "up" | "down";
  cache: "not_configured" | "up" | "down";
}