import { Request, Response, NextFunction } from "express";
import { TrainingProgramService } from "./training-program.service.js";

export class TrainingProgramController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const trainingPrograms = await TrainingProgramService.findAll();

      res.json(trainingPrograms);
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

      const trainingProgram = await TrainingProgramService.findById(id);

      if (!trainingProgram) {
        res.status(404).json({
          message: "Training program not found",
        });

        return;
      }

      res.json(trainingProgram);

    } catch (error) {
      next(error);
    }
  }


  // GET /api/training-programs/:id/eagerly -> program with enrollments and tutor assignments.
  static async getEagerlyById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const trainingProgram = await TrainingProgramService.findEagerlyById(id);

      if (!trainingProgram) {
        res.status(404).json({
          message: "Training program not found",
        });

        return;
      }

      res.json(trainingProgram);

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
      const { familyId, centerId, name, code, level, isActive } = req.body;

      if (!familyId || !centerId || !name || !code || !level) {
        res.status(400).json({
          message: "familyId, centerId, name, code and level are required",
        });

        return;
      }

      const trainingProgram = await TrainingProgramService.create({
        familyId,
        centerId,
        name,
        code,
        level,
        isActive,
      });

      res.status(201).json(trainingProgram);

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

      const trainingProgram = await TrainingProgramService.findById(id);

      if (!trainingProgram) {
        res.status(404).json({
          message: "Training program not found",
        });

        return;
      }

      const updatedTrainingProgram = await TrainingProgramService.update(
        trainingProgram,
        req.body
      );

      res.json(updatedTrainingProgram);

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

      const trainingProgram = await TrainingProgramService.findById(id);

      if (!trainingProgram) {
        res.status(404).json({
          message: "Training program not found",
        });

        return;
      }

      await TrainingProgramService.delete(trainingProgram);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}
