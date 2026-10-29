import { Request, Response, NextFunction } from "express";
import { StudentInterestService } from "./student-interest.service.js";

export class StudentInterestController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const studentInterests = await StudentInterestService.findAll();

      res.json(studentInterests);
    } catch (error) {
      next(error);
    }
  }


  // GET /api/student-interests/student/:studentId
  static async getByStudentId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const studentId = Number(req.params.studentId);

      const studentInterests = await StudentInterestService.findByStudentId(studentId);

      res.json(studentInterests);
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

      const studentInterest = await StudentInterestService.findById(id);

      if (!studentInterest) {
        res.status(404).json({
          message: "Student interest not found",
        });

        return;
      }

      res.json(studentInterest);

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
      const { studentId, name, description } = req.body;

      if (!studentId || !name) {
        res.status(400).json({
          message: "studentId and name are required",
        });

        return;
      }

      const studentInterest = await StudentInterestService.create({
        studentId,
        name,
        description,
      });

      res.status(201).json(studentInterest);

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

      const studentInterest = await StudentInterestService.findById(id);

      if (!studentInterest) {
        res.status(404).json({
          message: "Student interest not found",
        });

        return;
      }

      const updatedStudentInterest = await StudentInterestService.update(
        studentInterest,
        req.body
      );

      res.json(updatedStudentInterest);

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

      const studentInterest = await StudentInterestService.findById(id);

      if (!studentInterest) {
        res.status(404).json({
          message: "Student interest not found",
        });

        return;
      }

      await StudentInterestService.delete(studentInterest);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}
