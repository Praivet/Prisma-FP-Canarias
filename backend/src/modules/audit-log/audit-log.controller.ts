import type { Request, Response, NextFunction } from "express";
import { AuditLogService } from "./audit-log.service.js";

export class AuditLogController {
  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const items = await AuditLogService.findAll();
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
      const auditLog = await AuditLogService.findById(id);
      if (!auditLog) {
        res.status(404).json({
          message: "Registro de auditoría no encontrado",
        });
        return;
      }
      res.json(auditLog);
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
      const { action, entityType, entityId, previousValues, newValues } = req.body;
      if (!action || !entityType || !entityId) {
        res.status(400).json({
          message: "action, entityType y entityId son obligatorios",
        });
        return;
      }
      const auditLog = await AuditLogService.create({ action, entityType, entityId, previousValues, newValues });
      res.status(201).json(auditLog);
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
      const auditLog = await AuditLogService.findById(id);
      if (!auditLog) {
        res.status(404).json({
          message: "Registro de auditoría no encontrado",
        });
        return;
      }
      const { action, entityType, entityId, previousValues, newValues } = req.body;
      await AuditLogService.update(auditLog, { action, entityType, entityId, previousValues, newValues });
      res.json(auditLog);
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
      const auditLog = await AuditLogService.findById(id);

      if (!auditLog) {
        res.status(404).json({
          message: "Registro de auditoría no encontrado",
        });
        return;
      }

      await AuditLogService.delete(auditLog);
      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}