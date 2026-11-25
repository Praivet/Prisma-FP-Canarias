import type { Request, Response, NextFunction } from "express";
import { RolePermissionService } from "./role-permission.service.js";

export class RolePermissionController {
  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const items = await RolePermissionService.findAll();
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
      const roleId = Number(req.params.roleId);
      const permissionId = Number(req.params.permissionId);
      const rolePermission = await RolePermissionService.findById(roleId, permissionId);
      if (!rolePermission) {
        res.status(404).json({
          message: "Permiso de rol no encontrado",
        });
        return;
      }
      res.json(rolePermission);
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
      const { roleId, permissionId } = req.body;
      if (!roleId || !permissionId) {
        res.status(400).json({
          message: "roleId y permissionId son obligatorios",
        });
        return;
      }
      const rolePermission = await RolePermissionService.create({ roleId, permissionId });
      res.status(201).json(rolePermission);
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
      const roleId = Number(req.params.roleId);
      const permissionId = Number(req.params.permissionId);
      const rolePermission = await RolePermissionService.findById(roleId, permissionId);

      if (!rolePermission) {
        res.status(404).json({
          message: "Permiso de rol no encontrado",
        });
        return;
      }

      await RolePermissionService.delete(rolePermission);
      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}