import type { Request, Response, NextFunction } from "express";
import { PermissionService } from "./permission.service.js";

export class PermissionController {
  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const items = await PermissionService.findAll();
      res.json(items);
    } catch (error) {
      next(error);
    }
  }
  static async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);
      const permission = await PermissionService.findById(id);
      if (!permission) {
        res.status(404).json({
          message: "Permiso no encontrado",
        });
        return;
      }
      res.json(permission);
    } catch (error) {
      next(error);
    }
  }
  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { code, description } = req.body;
      if (!code) {
        res.status(400).json({
          message: "code es obligatorio",
        });
        return;
      }
      const permission = await PermissionService.create({ code, description });
      res.status(201).json(permission);
    } catch (error) {
      next(error);
    }
  }
  static async update(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);
      const permission = await PermissionService.findById(id);
      if (!permission) {
        res.status(404).json({
          message: "Permiso no encontrado",
        });
        return;
      }
      const { code, description } = req.body;
      await PermissionService.update(permission, { code, description });
      res.json(permission);
    } catch (error) {
      next(error);
    }
  }
  static async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);
      const permission = await PermissionService.findById(id);

      if (!permission) {
        res.status(404).json({
          message: "Permiso no encontrado",
        });
        return;
      }

      await PermissionService.delete(permission);
      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}