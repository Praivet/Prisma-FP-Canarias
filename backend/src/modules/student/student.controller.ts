import { Request, Response, NextFunction } from "express";
import { StudentService } from "./student.service.js";

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


    // GET /api/students/:id/user -> alumno con su usuario (1:1), sin passwordHash.
    static async getWithUserById(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const id = Number(req.params.id);

            const student = await StudentService.findWithUserById(id);

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


    // GET /api/students/search/:lastNameSearch -> alumnos cuyo apellido contiene el texto
    // y que tienen al menos una matrícula. Devuelve [] si no hay ninguno (no es un 404).
    static async getAllByLastNameWithEnrollments(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const lastNameSearch = String(req.params.lastNameSearch);

            const students = await StudentService.findAllByLastNameWithEnrollments(lastNameSearch);

            res.json(students);
        } catch (error) {
            next(error);
        }
    }


    // GET /api/students/eagerly/skill/:skillName -> alumnos que tienen esa skill.
    static async getAllEagerlyBySkillName(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const skillName = String(req.params.skillName);

            const students = await StudentService.findAllEagerlyBySkillName(skillName);

            res.json(students);
        } catch (error) {
            next(error);
        }
    }


    // CONSULTA Q3: GET /api/students/born-after/:date -> p. ej. /born-after/2003-01-01
    // OJO: req.params.date porque en la ruta pone ":date". Si no coinciden, llega undefined y la BD da error 500.
    // Texto o fecha -> String(...). Id -> Number(...).
    static async getAllBornAfter(req: Request, res: Response, next: NextFunction) {
        try {
            res.json(await StudentService.findAllBornAfter(String(req.params.date)));
        } catch (error) {
            next(error);
        }
    }


    // CONSULTA Q4: GET /api/students/enrolled/level/:level -> p. ej. /enrolled/level/Grado Superior
    static async getAllEnrolledByProgramLevel(req: Request, res: Response, next: NextFunction) {
        try {
            res.json(await StudentService.findAllEnrolledByProgramLevel(String(req.params.level)));
        } catch (error) {
            next(error);
        }
    }


    // CONSULTA Q8: GET /api/students/eagerly/skills-level/:level -> p. ej. /eagerly/skills-level/advanced
    static async getAllWithSkillsAtLevel(req: Request, res: Response, next: NextFunction) {
        try {
            res.json(await StudentService.findAllWithSkillsAtLevel(String(req.params.level)));
        } catch (error) {
            next(error);
        }
    }


    // CONSULTA Q9: GET /api/students/eagerly/skills-interests
    static async getAllWithSkillsAndInterests(req: Request, res: Response, next: NextFunction) {
        try {
            res.json(await StudentService.findAllWithSkillsAndInterests());
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
