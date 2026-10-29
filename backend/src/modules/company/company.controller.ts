import type { Request, Response, NextFunction } from "express";
import { ForeignKeyConstraintError } from "sequelize";
import { CompanyService } from "./company.service.js";

export class CompanyController {
    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const companies = await CompanyService.findAll();
            res.json(companies);
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
            const company = await CompanyService.findById(id);
            if (!company) {
                res.status(404).json({
                    message: "Company not found",
                });
                return;
            }
            res.json(company);
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
            const { taxId, name, sector, city, contactEmail, contactPhone } = req.body;
            if (taxId === undefined || name === undefined) {
                res.status(400).json({
                    message: "taxId and name are required",
                });
                return;
            }
            if (await CompanyService.taxIdExists(taxId)) {
                res.status(409).json({
                    message: "A company with this taxId already exists",
                });
                return;
            }
            const company = await CompanyService.create({
                taxId,
                name,
                sector,
                city,
                contactEmail,
                contactPhone,
            });
            res.status(201).json(company);
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
            const company = await CompanyService.findById(id);
            if (!company) {
                res.status(404).json({
                    message: "Company not found",
                });
                return;
            }
            const { taxId, name, sector, city, contactEmail, contactPhone } = req.body;
            if (taxId !== undefined && taxId !== company.taxId) {
                if (await CompanyService.taxIdExists(taxId)) {
                    res.status(409).json({
                        message: "A company with this taxId already exists",
                    });
                    return;
                }
            }
            //... is an operator from js and ts, any questions -> ask me (jp)
            const updatedCompany = await CompanyService.update(company, {
                ...(taxId !== undefined && { taxId }),
                ...(name !== undefined && { name }),
                ...(sector !== undefined && { sector }),
                ...(city !== undefined && { city }),
                ...(contactEmail !== undefined && { contactEmail }),
                ...(contactPhone !== undefined && { contactPhone }),
            });
            res.json(updatedCompany);
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
            const company = await CompanyService.findById(id);
            if (!company) {
                res.status(404).json({
                    message: "Company not found",
                });
                return;
            }
            await CompanyService.delete(company);
            res.status(204).send();
        } catch (error) {
            if (error instanceof ForeignKeyConstraintError) {
                res.status(409).json({
                    message: "Cannot delete a company that has internships or employment records",
                });
                return;
            }
            next(error);
        }
    }
}
