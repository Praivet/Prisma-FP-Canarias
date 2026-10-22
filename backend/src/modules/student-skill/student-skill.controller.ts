import { Request, Response, NextFunction } from "express";
import { StudentSkillService } from "./student-skill.service";

export class StudentSkillController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const studentSkills = await StudentSkillService.findAll();

      res.json(studentSkills);
    } catch (error) {
      next(error);
    }
  }


  // GET /api/student-skills/student/:studentId
  static async getByStudentId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const studentId = Number(req.params.studentId);

      const studentSkills = await StudentSkillService.findByStudentId(studentId);

      res.json(studentSkills);
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

      const studentSkill = await StudentSkillService.findById(id);

      if (!studentSkill) {
        res.status(404).json({
          message: "Student skill not found",
        });

        return;
      }

      res.json(studentSkill);

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
      const { studentId, skillId, level } = req.body;

      if (!studentId || !skillId) {
        res.status(400).json({
          message: "studentId and skillId are required",
        });

        return;
      }

      const studentSkill = await StudentSkillService.create({
        studentId,
        skillId,
        level,
      });

      res.status(201).json(studentSkill);

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

      const studentSkill = await StudentSkillService.findById(id);

      if (!studentSkill) {
        res.status(404).json({
          message: "Student skill not found",
        });

        return;
      }

      const updatedStudentSkill = await StudentSkillService.update(
        studentSkill,
        req.body
      );

      res.json(updatedStudentSkill);

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

      const studentSkill = await StudentSkillService.findById(id);

      if (!studentSkill) {
        res.status(404).json({
          message: "Student skill not found",
        });

        return;
      }

      await StudentSkillService.delete(studentSkill);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}
