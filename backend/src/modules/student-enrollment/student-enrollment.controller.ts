import { Request, Response, NextFunction } from "express";
import { StudentEnrollmentService } from "./student-enrollment.service";

export class StudentEnrollmentController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const studentEnrollments = await StudentEnrollmentService.findAll();

      res.json(studentEnrollments);
    } catch (error) {
      next(error);
    }
  }


  // Eager endpoint without params: GET /api/student-enrollments/eagerly.
  static async getAllEagerly(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const studentEnrollments = await StudentEnrollmentService.findAllEagerly();

      res.json(studentEnrollments);
    } catch (error) {
      next(error);
    }
  }


  // GET /api/student-enrollments/student/:studentId
  static async getByStudentId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const studentId = Number(req.params.studentId);

      const studentEnrollments = await StudentEnrollmentService.findByStudentId(studentId);

      res.json(studentEnrollments);
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

      const studentEnrollment = await StudentEnrollmentService.findById(id);

      if (!studentEnrollment) {
        res.status(404).json({
          message: "Student enrollment not found",
        });

        return;
      }

      res.json(studentEnrollment);

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
      const { studentId, programId, academicYearId, enrollmentDate, graduationDate, status } = req.body;

      if (!studentId || !programId || !academicYearId) {
        res.status(400).json({
          message: "studentId, programId and academicYearId are required",
        });

        return;
      }

      const studentEnrollment = await StudentEnrollmentService.create({
        studentId,
        programId,
        academicYearId,
        enrollmentDate,
        graduationDate,
        status,
      });

      res.status(201).json(studentEnrollment);

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

      const studentEnrollment = await StudentEnrollmentService.findById(id);

      if (!studentEnrollment) {
        res.status(404).json({
          message: "Student enrollment not found",
        });

        return;
      }

      const updatedStudentEnrollment = await StudentEnrollmentService.update(
        studentEnrollment,
        req.body
      );

      res.json(updatedStudentEnrollment);

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

      const studentEnrollment = await StudentEnrollmentService.findById(id);

      if (!studentEnrollment) {
        res.status(404).json({
          message: "Student enrollment not found",
        });

        return;
      }

      await StudentEnrollmentService.delete(studentEnrollment);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}
