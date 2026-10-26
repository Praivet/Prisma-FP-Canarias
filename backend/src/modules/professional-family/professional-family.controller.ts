import type { Request, Response, NextFunction } from "express";
import { ProfessionalFamilyService } from "./professional-family.service.js";

export class ProfessionalFamilyController {
  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const items = await ProfessionalFamilyService.findAll();
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
      const professionalFamily = await ProfessionalFamilyService.findById(id);
      if (!professionalFamily) {
        res.status(404).json({
          message: "Familia profesional no encontrada",
        });
        return;
      }
      res.json(professionalFamily);
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
      const { name, code, description } = req.body;
      if (!name || !code) {
        res.status(400).json({
          message: "name y code son obligatorios",
        });
        return;
      }
      const professionalFamily = await ProfessionalFamilyService.create({ name, code, description });
      res.status(201).json(professionalFamily);
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
      const professionalFamily = await ProfessionalFamilyService.findById(id);
      if (!professionalFamily) {
        res.status(404).json({
          message: "Familia profesional no encontrada",
        });
        return;
      }
      const { name, code, description } = req.body;
      await ProfessionalFamilyService.update(professionalFamily, { name, code, description });
      res.json(professionalFamily);
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
      const professionalFamily = await ProfessionalFamilyService.findById(id);

      if (!professionalFamily) {
        res.status(404).json({
          message: "Familia profesional no encontrada",
        });
        return;
      }

      await ProfessionalFamilyService.delete(professionalFamily);
      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}