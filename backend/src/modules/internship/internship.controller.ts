import type { Request, Response, NextFunction } from "express";
import { InternshipService } from "./internship.service.js";

export class InternshipController {
    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const internships = await InternshipService.findAll();
            res.json(internships);
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
            const internship = await InternshipService.findById(id);
            if (!internship) {
                res.status(404).json({
                    message: "Internship not found",
                });
                return;
            }
            res.json(internship);
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
            const { enrollmentId, companyId, startDate, endDate, wasHired, hiringDate } = req.body;
            if (enrollmentId === undefined || companyId === undefined || startDate === undefined) {
                res.status(400).json({
                    message: "enrollmentId, companyId and startDate are required",
                });
                return;
            }
            if (!(await InternshipService.studentEnrollmentExists(Number(enrollmentId)))) {
                res.status(400).json({
                    message: "Student enrollment not found",
                });
                return;
            }
            if (!(await InternshipService.companyExists(Number(companyId)))) {
                res.status(400).json({
                    message: "Company not found",
                });
                return;
            }
            const internship = await InternshipService.create({
                enrollmentId: Number(enrollmentId),
                companyId: Number(companyId),
                startDate,
                endDate,
                wasHired,
                hiringDate,
            });
            res.status(201).json(internship);
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
            const internship = await InternshipService.findById(id);
            if (!internship) {
                res.status(404).json({
                    message: "Internship not found",
                });
                return;
            }
            const { enrollmentId, companyId, startDate, endDate, wasHired, hiringDate } = req.body;
            if (
                enrollmentId !== undefined &&
                !(await InternshipService.studentEnrollmentExists(Number(enrollmentId)))
            ) {
                res.status(400).json({
                    message: "Student enrollment not found",
                });
                return;
            }
            if (
                companyId !== undefined &&
                !(await InternshipService.companyExists(Number(companyId)))
            ) {
                res.status(400).json({
                    message: "Company not found",
                });
                return;
            }
            const updatedInternship = await InternshipService.update(internship, {
                ...(enrollmentId !== undefined && { enrollmentId: Number(enrollmentId) }),
                ...(companyId !== undefined && { companyId: Number(companyId) }),
                ...(startDate !== undefined && { startDate }),
                ...(endDate !== undefined && { endDate }),
                ...(wasHired !== undefined && { wasHired }),
                ...(hiringDate !== undefined && { hiringDate }),
            });
            res.json(updatedInternship);
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
            const internship = await InternshipService.findById(id);
            if (!internship) {
                res.status(404).json({
                    message: "Internship not found",
                });
                return;
            }
            await InternshipService.delete(internship);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
