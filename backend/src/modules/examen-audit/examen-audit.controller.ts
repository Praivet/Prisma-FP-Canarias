import type { Request, Response, NextFunction } from "express";
import { ExamenAuditService } from "./examen-audit.service.js";

// Valores permitidos para operation (además de null)
const OPERATIONS = ["CREATE", "MODIFY", "READ"];

export class ExamenAuditController {
    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const examenAudits = await ExamenAuditService.findAll();
            res.json(examenAudits);
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
            const examenAudit = await ExamenAuditService.findById(id);
            if (!examenAudit) {
                res.status(404).json({
                    message: "ExamenAudit not found",
                });
                return;
            }
            res.json(examenAudit);
        } catch (error) {
            next(error);
        }
    }
    static async getOperationCreate(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const examenAudits = await ExamenAuditService.findOperationCreate();
            res.json(examenAudits);
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
            const { companyId, description, operation } = req.body;
            if (companyId === undefined || description === undefined) {
                res.status(400).json({
                    message: "companyId and description are required",
                });
                return;
            }
            // operation es opcional, pero si viene con valor tiene que ser uno de los 3
            if (operation !== undefined && operation !== null && !OPERATIONS.includes(operation)) {
                res.status(400).json({
                    message: "operation must be CREATE, MODIFY or READ",
                });
                return;
            }
            if (!(await ExamenAuditService.companyExists(Number(companyId)))) {
                res.status(400).json({
                    message: "Company not found",
                });
                return;
            }
            const examenAudit = await ExamenAuditService.create({
                companyId: Number(companyId),
                description,
                operation,
            });
            res.status(201).json(examenAudit);
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
            const examenAudit = await ExamenAuditService.findById(id);
            if (!examenAudit) {
                res.status(404).json({
                    message: "ExamenAudit not found",
                });
                return;
            }
            const { companyId, description, operation } = req.body;
            if (operation !== undefined && operation !== null && !OPERATIONS.includes(operation)) {
                res.status(400).json({
                    message: "operation must be CREATE, MODIFY or READ",
                });
                return;
            }
            if (
                companyId !== undefined &&
                !(await ExamenAuditService.companyExists(Number(companyId)))
            ) {
                res.status(400).json({
                    message: "Company not found",
                });
                return;
            }
            const updatedExamenAudit = await ExamenAuditService.update(examenAudit, {
                ...(companyId !== undefined && { companyId: Number(companyId) }),
                ...(description !== undefined && { description }),
                ...(operation !== undefined && { operation }),
            });
            res.json(updatedExamenAudit);
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
            const examenAudit = await ExamenAuditService.findById(id);
            if (!examenAudit) {
                res.status(404).json({
                    message: "ExamenAudit not found",
                });
                return;
            }
            await ExamenAuditService.delete(examenAudit);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
