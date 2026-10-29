import type { Request, Response, NextFunction } from "express";
import { EmploymentRecordService } from "./employment-record.service.js";

export class EmploymentRecordController {
    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const employmentRecords = await EmploymentRecordService.findAll();
            res.json(employmentRecords);
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
            const employmentRecord = await EmploymentRecordService.findById(id);
            if (!employmentRecord) {
                res.status(404).json({
                    message: "Employment record not found",
                });
                return;
            }
            res.json(employmentRecord);
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
            const { studentId, companyId, internshipId, position, sector, startDate, endDate, isRelatedToStudies } = req.body;
            if (studentId === undefined || companyId === undefined || position === undefined || startDate === undefined) {
                res.status(400).json({
                    message: "studentId, companyId, position and startDate are required",
                });
                return;
            }
            if (!(await EmploymentRecordService.studentExists(Number(studentId)))) {
                res.status(400).json({
                    message: "Student not found",
                });
                return;
            }
            if (!(await EmploymentRecordService.companyExists(Number(companyId)))) {
                res.status(400).json({
                    message: "Company not found",
                });
                return;
            }
            // La FK es opcional: solo se comprueba si viene con valor
            if (
                internshipId !== undefined &&
                internshipId !== null &&
                !(await EmploymentRecordService.internshipExists(Number(internshipId)))
            ) {
                res.status(400).json({
                    message: "Internship not found",
                });
                return;
            }
            const employmentRecord = await EmploymentRecordService.create({
                studentId: Number(studentId),
                companyId: Number(companyId),
                ...(internshipId !== undefined && { internshipId: internshipId === null ? null : Number(internshipId) }),
                position,
                sector,
                startDate,
                endDate,
                isRelatedToStudies,
            });
            res.status(201).json(employmentRecord);
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
            const employmentRecord = await EmploymentRecordService.findById(id);
            if (!employmentRecord) {
                res.status(404).json({
                    message: "Employment record not found",
                });
                return;
            }
            const { studentId, companyId, internshipId, position, sector, startDate, endDate, isRelatedToStudies } = req.body;
            if (
                studentId !== undefined &&
                !(await EmploymentRecordService.studentExists(Number(studentId)))
            ) {
                res.status(400).json({
                    message: "Student not found",
                });
                return;
            }
            if (
                companyId !== undefined &&
                !(await EmploymentRecordService.companyExists(Number(companyId)))
            ) {
                res.status(400).json({
                    message: "Company not found",
                });
                return;
            }
            if (
                internshipId !== undefined &&
                internshipId !== null &&
                !(await EmploymentRecordService.internshipExists(Number(internshipId)))
            ) {
                res.status(400).json({
                    message: "Internship not found",
                });
                return;
            }
            const updatedEmploymentRecord = await EmploymentRecordService.update(employmentRecord, {
                ...(studentId !== undefined && { studentId: Number(studentId) }),
                ...(companyId !== undefined && { companyId: Number(companyId) }),
                ...(internshipId !== undefined && { internshipId: internshipId === null ? null : Number(internshipId) }),
                ...(position !== undefined && { position }),
                ...(sector !== undefined && { sector }),
                ...(startDate !== undefined && { startDate }),
                ...(endDate !== undefined && { endDate }),
                ...(isRelatedToStudies !== undefined && { isRelatedToStudies }),
            });
            res.json(updatedEmploymentRecord);
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
            const employmentRecord = await EmploymentRecordService.findById(id);
            if (!employmentRecord) {
                res.status(404).json({
                    message: "Employment record not found",
                });
                return;
            }
            await EmploymentRecordService.delete(employmentRecord);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
