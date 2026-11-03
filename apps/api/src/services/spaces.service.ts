import type {
  CreateSpaceInput,
  UpdateSpaceInput,
  ListSpacesQuery
} from "@reservalab/shared";
import {
  listSpaces,
  findSpaceById,
  insertSpace,
  updateSpaceById,
  deactivateSpaceById
} from "../repositories/spaces.repository.js";

export class SpaceNotFoundError extends Error {
  constructor() {
    super("Espacio no encontrado");
    this.name = "SpaceNotFoundError";
  }
}

export async function getSpaces(filters: ListSpacesQuery) {
  return listSpaces(filters);
}

export async function getSpace(id: string) {
  const space = await findSpaceById(id);

  if (!space || !space.active) {
    throw new SpaceNotFoundError();
  }

  return space;
}

export async function createSpace(data: CreateSpaceInput) {
  return insertSpace(data);
}

export async function editSpace(
  id: string,
  data: UpdateSpaceInput
) {
  const space = await updateSpaceById(id, data);

  if (!space) {
    throw new SpaceNotFoundError();
  }

  return space;
}

export async function deleteSpace(id: string): Promise<void> {
  const space = await deactivateSpaceById(id);

  if (!space) {
    throw new SpaceNotFoundError();
  }
}