import type { Request, Response, NextFunction } from "express";
import { EducationalCenterService } from "./educational-center.service.js";

export class EducationalCenterController {
  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const items = await EducationalCenterService.findAll();
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
      const educationalCenter = await EducationalCenterService.findById(id);
      if (!educationalCenter) {
        res.status(404).json({
          message: "Centro educativo no encontrado",
        });
        return;
      }
      res.json(educationalCenter);
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
      const { name, code, logoUrl, address, isActive } = req.body;
      if (!name || !code) {
        res.status(400).json({
          message: "name y code son obligatorios",
        });
        return;
      }
      const educationalCenter = await EducationalCenterService.create({ name, code, logoUrl, address, isActive });
      res.status(201).json(educationalCenter);
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
      const educationalCenter = await EducationalCenterService.findById(id);
      if (!educationalCenter) {
        res.status(404).json({
          message: "Centro educativo no encontrado",
        });
        return;
      }
      const { name, code, logoUrl, address, isActive } = req.body;
      await EducationalCenterService.update(educationalCenter, { name, code, logoUrl, address, isActive });
      res.json(educationalCenter);
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
      const educationalCenter = await EducationalCenterService.findById(id);

      if (!educationalCenter) {
        res.status(404).json({
          message: "Centro educativo no encontrado",
        });
        return;
      }

      await EducationalCenterService.delete(educationalCenter);
      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}