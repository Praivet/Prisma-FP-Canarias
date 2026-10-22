import { Request, Response, NextFunction } from "express";
import { StudentService } from "./student.service";

export class StudentController {

    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const students = await StudentService.findAll();

            res.json(students);
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

            const student = await StudentService.findById(id);

            if (!student) {
                res.status(404).json({
                    message: "Student not found",
                });

                return;
            }

            res.json(student);

        } catch (error) {
            next(error);
        }
    }


    // GET /api/students/:id/eagerly -> student with interests, skills and enrollments.
    static async getEagerlyById(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const id = Number(req.params.id);

            const student = await StudentService.findEagerlyById(id);

            if (!student) {
                res.status(404).json({
                    message: "Student not found",
                });

                return;
            }

            res.json(student);

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
            const { userId, nationalId, firstName, lastName, email, phone, birthDate } = req.body;

            if (!userId || !nationalId || !firstName || !lastName || !email) {
                res.status(400).json({
                    message: "userId, nationalId, firstName, lastName and email are required",
                });

                return;
            }

            const student = await StudentService.create({
                userId,
                nationalId,
                firstName,
                lastName,
                email,
                phone,
                birthDate,
            });

            res.status(201).json(student);

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

            const student = await StudentService.findById(id);

            if (!student) {
                res.status(404).json({
                    message: "Student not found",
                });

                return;
            }

            const updatedStudent = await StudentService.update(
                student,
                req.body
            );

            res.json(updatedStudent);

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

            const student = await StudentService.findById(id);

            if (!student) {
                res.status(404).json({
                    message: "Student not found",
                });

                return;
            }

            await StudentService.delete(student);

            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }
}
