import type { Request, Response } from "express";
import {
  createSpaceSchema,
  updateSpaceSchema,
  listSpacesQuerySchema,
  spaceIdSchema
} from "@reservalab/shared";
import {
  getSpaces,
  createSpace,
  editSpace,
  deleteSpace,
  SpaceNotFoundError
} from "../services/spaces.service.js";

function handleError(error: unknown, res: Response): void {
  if (error instanceof SpaceNotFoundError) {
    res.status(404).json({
      error: error.message
    });
    return;
  }

  res.status(500).json({
    error: "No se pudo completar la operacion"
  });
}

export async function list(
  req: Request,
  res: Response
): Promise<void> {
  const result = listSpacesQuerySchema.safeParse(req.query);

  if (!result.success) {
    res.status(400).json({
      error: "Filtros invalidos",
      details: result.error.issues
    });
    return;
  }

  try {
    const spaces = await getSpaces(result.data);

    res.status(200).json({
      spaces
    });
  } catch (error) {
    handleError(error, res);
  }
}

export async function create(
  req: Request,
  res: Response
): Promise<void> {
  const result = createSpaceSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      error: "Datos del espacio invalidos",
      details: result.error.issues
    });
    return;
  }

  try {
    const space = await createSpace(result.data);

    res.status(201).json({
      message: "Espacio creado correctamente",
      space
    });
  } catch (error) {
    handleError(error, res);
  }
}

export async function update(
  req: Request,
  res: Response
): Promise<void> {
  const idResult = spaceIdSchema.safeParse(req.params.id);

  if (!idResult.success) {
    res.status(400).json({
      error: "Identificador de espacio invalido"
    });
    return;
  }

  const result = updateSpaceSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      error: "Datos de actualizacion invalidos",
      details: result.error.issues
    });
    return;
  }

  try {
    const space = await editSpace(idResult.data, result.data);

    res.status(200).json({
      message: "Espacio actualizado correctamente",
      space
    });
  } catch (error) {
    handleError(error, res);
  }
}

export async function remove(
  req: Request,
  res: Response
): Promise<void> {
  const result = spaceIdSchema.safeParse(req.params.id);

  if (!result.success) {
    res.status(400).json({
      error: "Identificador de espacio invalido"
    });
    return;
  }

  try {
    await deleteSpace(result.data);

    res.status(204).send();
  } catch (error) {
    handleError(error, res);
  }
}