import { Request, Response, NextFunction } from "express";
import { AcademicYearService } from "./academic-year.service";

export class AcademicYearController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const academicYears = await AcademicYearService.findAll();

      res.json(academicYears);
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

      const academicYear = await AcademicYearService.findById(id);

      if (!academicYear) {
        res.status(404).json({
          message: "Academic year not found",
        });

        return;
      }

      res.json(academicYear);

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

      const academicYear = await AcademicYearService.findEagerlyById(id);

      if (!academicYear) {
        res.status(404).json({
          message: "Academic year not found",
        });

        return;
      }

      res.json(academicYear);

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
      const { name, startDate, endDate, isActive } = req.body;

      if (!name || !startDate || !endDate) {
        res.status(400).json({
          message: "name, startDate and endDate are required",
        });

        return;
      }

      const academicYear = await AcademicYearService.create({
        name,
        startDate,
        endDate,
        isActive,
      });

      res.status(201).json(academicYear);

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

      const academicYear = await AcademicYearService.findById(id);

      if (!academicYear) {
        res.status(404).json({
          message: "Academic year not found",
        });

        return;
      }

      const updatedAcademicYear = await AcademicYearService.update(
        academicYear,
        req.body
      );

      res.json(updatedAcademicYear);

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

      const academicYear = await AcademicYearService.findById(id);

      if (!academicYear) {
        res.status(404).json({
          message: "Academic year not found",
        });

        return;
      }

      await AcademicYearService.delete(academicYear);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}
