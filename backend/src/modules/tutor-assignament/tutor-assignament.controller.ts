import { Request, Response, NextFunction } from "express";
import { TutorAssignmentService } from "./tutor-assignament.service";

export class TutorAssignmentController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const tutorAssignments = await TutorAssignmentService.findAll();

      res.json(tutorAssignments);
    } catch (error) {
      next(error);
    }
  }


  // Eager endpoint without params: GET /api/tutor-assignments/eagerly.
  static async getAllEagerly(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const tutorAssignments = await TutorAssignmentService.findAllEagerly();

      res.json(tutorAssignments);
    } catch (error) {
      next(error);
    }
  }


  // GET /api/tutor-assignments/tutor/:tutorId
  static async getByTutorId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const tutorId = Number(req.params.tutorId);

      const tutorAssignments = await TutorAssignmentService.findByTutorId(tutorId);

      res.json(tutorAssignments);
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

      const tutorAssignment = await TutorAssignmentService.findById(id);

      if (!tutorAssignment) {
        res.status(404).json({
          message: "Tutor assignment not found",
        });

        return;
      }

      res.json(tutorAssignment);

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
      const { tutorId, programId, academicYearId, assignedAt } = req.body;

      if (!tutorId || !programId || !academicYearId) {
        res.status(400).json({
          message: "tutorId, programId and academicYearId are required",
        });

        return;
      }

      const tutorAssignment = await TutorAssignmentService.create({
        tutorId,
        programId,
        academicYearId,
        assignedAt,
      });

      res.status(201).json(tutorAssignment);

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

      const tutorAssignment = await TutorAssignmentService.findById(id);

      if (!tutorAssignment) {
        res.status(404).json({
          message: "Tutor assignment not found",
        });

        return;
      }

      const updatedTutorAssignment = await TutorAssignmentService.update(
        tutorAssignment,
        req.body
      );

      res.json(updatedTutorAssignment);

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

      const tutorAssignment = await TutorAssignmentService.findById(id);

      if (!tutorAssignment) {
        res.status(404).json({
          message: "Tutor assignment not found",
        });

        return;
      }

      await TutorAssignmentService.delete(tutorAssignment);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}
