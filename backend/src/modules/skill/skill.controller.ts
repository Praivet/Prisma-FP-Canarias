import { Request, Response, NextFunction } from "express";
import { SkillService } from "./skill.service.js";

export class SkillController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const skills = await SkillService.findAll();

      res.json(skills);
    } catch (error) {
      next(error);
    }
  }


  // Route params arrive as strings: convert with Number(). 404 if nothing was found.
  static async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const skill = await SkillService.findById(id);

      if (!skill) {
        res.status(404).json({
          message: "Skill not found",
        });

        return;
      }

      res.json(skill);

    } catch (error) {
      next(error);
    }
  }


  static async getEagerlyById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const skill = await SkillService.findEagerlyById(id);

      if (!skill) {
        res.status(404).json({
          message: "Skill not found",
        });

        return;
      }

      res.json(skill);

    } catch (error) {
      next(error);
    }
  }


  // Validate the required fields (400) before calling the service. 201 = created.
  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, category, description } = req.body;

      if (!name) {
        res.status(400).json({
          message: "name is required",
        });

        return;
      }

      const skill = await SkillService.create({
        name,
        category,
        description,
      });

      res.status(201).json(skill);

    } catch (error) {
      next(error);
    }
  }


  // Find first (404 if missing), then pass the loaded instance to the service.
  static async update(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const skill = await SkillService.findById(id);

      if (!skill) {
        res.status(404).json({
          message: "Skill not found",
        });

        return;
      }

      const updatedSkill = await SkillService.update(
        skill,
        req.body
      );

      res.json(updatedSkill);

    } catch (error) {
      next(error);
    }
  }


  // Find first (404 if missing), then delete. 204 = success with no body.
  static async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const skill = await SkillService.findById(id);

      if (!skill) {
        res.status(404).json({
          message: "Skill not found",
        });

        return;
      }

      await SkillService.delete(skill);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}
