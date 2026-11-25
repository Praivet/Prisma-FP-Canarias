import type { Request, Response, NextFunction } from "express";
import { UserRoleService } from "./user-role.service.js";

export class UserRoleController {
  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const items = await UserRoleService.findAll();
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
      const userId = Number(req.params.userId);
      const roleId = Number(req.params.roleId);
      const userRole = await UserRoleService.findById(userId, roleId);
      if (!userRole) {
        res.status(404).json({
          message: "Asignación de rol no encontrada",
        });
        return;
      }
      res.json(userRole);
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
      const { userId, roleId, assignedAt } = req.body;
      if (!userId || !roleId) {
        res.status(400).json({
          message: "userId y roleId son obligatorios",
        });
        return;
      }
      const userRole = await UserRoleService.create({ userId, roleId, assignedAt });
      res.status(201).json(userRole);
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
      const userId = Number(req.params.userId);
      const roleId = Number(req.params.roleId);
      const userRole = await UserRoleService.findById(userId, roleId);
      if (!userRole) {
        res.status(404).json({
          message: "Asignación de rol no encontrada",
        });
        return;
      }
      const { assignedAt } = req.body;
      await UserRoleService.update(userRole, { assignedAt });
      res.json(userRole);
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
      const userId = Number(req.params.userId);
      const roleId = Number(req.params.roleId);
      const userRole = await UserRoleService.findById(userId, roleId);

      if (!userRole) {
        res.status(404).json({
          message: "Asignación de rol no encontrada",
        });
        return;
      }

      await UserRoleService.delete(userRole);
      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}