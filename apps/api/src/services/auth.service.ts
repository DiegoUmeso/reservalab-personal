import { hash, compare } from "bcryptjs";
import type { RegisterInput, LoginInput } from "@reservalab/shared";
import {
  createUser,
  findUserByEmail
} from "../repositories/users.repository.js";
import { createAccessToken } from "./tokens.service.js";

export async function registerUser(data: RegisterInput) {
  const passwordHash = await hash(data.password, 12);

  return createUser({
    name: data.name,
    email: data.email.toLowerCase(),
    passwordHash
  });
}

export async function loginUser(data: LoginInput) {
  if (Buffer.byteLength(data.password, "utf8") > 72) {
    return null;
  }

  const user = await findUserByEmail(data.email.toLowerCase());

  if (!user || !user.active) {
    return null;
  }

  const passwordMatches = await compare(
    data.password,
    user.passwordHash
  );

  if (!passwordMatches) {
    return null;
  }

  return {
    accessToken: createAccessToken(user),
    tokenType: "Bearer",
    expiresIn: 900,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
}