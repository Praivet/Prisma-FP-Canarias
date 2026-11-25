import type { Request, Response, NextFunction } from "express";
import { ForeignKeyConstraintError } from "sequelize";
import { CompanyService } from "./company.service.js";
import { unlink } from "fs/promises";
import { removeImage } from "../../middlewares/upload.middleware.js";


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
        let created = false;
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
                filename: req.file ?.filename ?? null,
            });
            created = true;
            res.status(201).json(company);
        } catch (error) {
            next(error);
        } finally {
            if (!created && req.file) {
               await unlink(req.file.path).catch((error) => console.error("Error deleting file:", error));
            }
    }
}
    static async update(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        let updated = false;
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
            const data: Parameters<typeof CompanyService.update>[1] = {
                ...(taxId !== undefined && { taxId }),
                ...(name !== undefined && { name }),
                ...(sector !== undefined && { sector }),
                ...(city !== undefined && { city }),
                ...(contactEmail !== undefined && { contactEmail }),
                ...(contactPhone !== undefined && { contactPhone }),
            };
            // Keep the old logo name so it can be removed once the new one is saved
            const previousFilename = company.filename;
            if (req.file) data.filename = req.file.filename;
            const updatedCompany = await CompanyService.update(company, data);
            updated = true;
            if (req.file) await removeImage(previousFilename);
            res.json(updatedCompany);
        } catch (error) {
            next(error);
        } finally {
            // If the update failed, remove the new image so it does not stay orphaned
            if (!updated && req.file) await removeImage(req.file.filename);
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
